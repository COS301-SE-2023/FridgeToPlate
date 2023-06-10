package com.fridgetoplate.repository;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBSaveExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ExpectedAttributeValue;
import com.fridgetoplate.model.Profile;

@Repository
public class ProfileRepository {
    
    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    public Profile save(Profile profile){
        dynamoDBMapper.save(profile);
        return profile;
    }

    public Profile findById(String id){
       return dynamoDBMapper.load(Profile.class, id);
    }

    public List<Profile> findAll(){
        return dynamoDBMapper.scan(Profile.class, new DynamoDBScanExpression());
    }

    public String update(String id, Profile profile){
        dynamoDBMapper.save(profile,
                new DynamoDBSaveExpression()
        .withExpectedEntry("id",
                new ExpectedAttributeValue(
                        new AttributeValue().withS(id)
                )));
        return id;
    }

    public String delete(String id){
       Profile profile = dynamoDBMapper.load(Profile.class, id);
        dynamoDBMapper.delete(profile);
        return "Profile deleted successfully:: "+id;
    }
}
