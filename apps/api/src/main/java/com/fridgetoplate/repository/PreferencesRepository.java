package com.fridgetoplate.repository;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBSaveExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ExpectedAttributeValue;
import com.fridgetoplate.model.Preferences;

@Repository
public class PreferencesRepository {
     @Autowired
    private DynamoDBMapper dynamoDBMapper;

    public Preferences save(Preferences preferences){
        dynamoDBMapper.save(preferences);
        return preferences;
    }

    public Preferences findById(String id){
       return dynamoDBMapper.load(Preferences.class, id);
    }

    public List<Preferences> findAll(){
        return dynamoDBMapper.scan(Preferences.class, new DynamoDBScanExpression());
    }

    public Preferences update(String id, Preferences preference){

        Preferences preferenceData =  dynamoDBMapper.load(Preferences.class, id);

        System.out.println(preferenceData);

        if(preferenceData == null)
            return null;
            

        dynamoDBMapper.save(preferenceData,
                new DynamoDBSaveExpression()
        .withExpectedEntry("preferenceId",
                new ExpectedAttributeValue(
                        new AttributeValue().withS(id)
                )));
        return preferenceData;
    }

    public String delete(String username){
       Preferences preferences = dynamoDBMapper.load(Preferences.class, username);
        dynamoDBMapper.delete(preferences);
        return "Profile deleted successfully:: " + username;
    }
}
