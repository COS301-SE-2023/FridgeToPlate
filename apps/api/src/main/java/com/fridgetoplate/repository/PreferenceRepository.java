package com.fridgetoplate.repository;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBSaveExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ExpectedAttributeValue;
import com.fridgetoplate.model.Preference;

@Repository
public class PreferenceRepository {
     @Autowired
    private DynamoDBMapper dynamoDBMapper;

    public Preference save(Preference preference){
        dynamoDBMapper.save(preference);
        return preference;
    }

    public Preference findById(String id){
       return dynamoDBMapper.load(Preference.class, id);
    }

    public List<Preference> findAll(){
        return dynamoDBMapper.scan(Preference.class, new DynamoDBScanExpression());
    }

    public Preference update(String id, Preference preference){

        Preference preferenceData =  dynamoDBMapper.load(Preference.class, id);

        System.out.println(preferenceData);

        if(preferenceData == null)
            return null;


        if(preference.getName() != null) {
            preferenceData.setName(preference.getName());
        }

        dynamoDBMapper.save(preferenceData,
                new DynamoDBSaveExpression()
        .withExpectedEntry("preferenceId",
                new ExpectedAttributeValue(
                        new AttributeValue().withS(id)
                )));
        return preferenceData;
    }

    public String delete(String id){
       Preference preference = dynamoDBMapper.load(Preference.class, id);
        dynamoDBMapper.delete(preference);
        return "Profile deleted successfully:: " + id;
    }
}
