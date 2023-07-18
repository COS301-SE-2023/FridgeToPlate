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

    public Preferences findByName(String username){
       return dynamoDBMapper.load(Preferences.class, username);
    }

    public List<Preferences> findAll(){
        return dynamoDBMapper.scan(Preferences.class, new DynamoDBScanExpression());
    }

    public Preferences update(String username, Preferences preferences){

        System.out.println(preferences + "Before");

        if(preferences == null)
            return null;
            

        dynamoDBMapper.save(preferences,
                new DynamoDBSaveExpression()
        .withExpectedEntry("username",
                new ExpectedAttributeValue(
                        new AttributeValue().withS(username)
                )));

        System.out.println(preferences + "After");
        return preferences;
    }

    public String delete(String username){
       Preferences preferences = dynamoDBMapper.load(Preferences.class, username);
        dynamoDBMapper.delete(preferences);
        return "Preferences deleted successfully: " + username;
    }
}
