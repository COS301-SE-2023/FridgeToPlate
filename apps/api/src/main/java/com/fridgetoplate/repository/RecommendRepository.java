package com.fridgetoplate.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBSaveExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ExpectedAttributeValue;
import com.fridgetoplate.model.RecommendModel;

@Repository
public class RecommendRepository {
    @Autowired
    private DynamoDBMapper dynamoDBMapper;
    
    public void save(RecommendModel recommendObject){
        dynamoDBMapper.save(recommendObject);      
    }

    public RecommendModel getById(String username){
        return dynamoDBMapper.load(RecommendModel.class, username);
    }

    public void updateRecommendPreferences(RecommendModel userPreferences){
        dynamoDBMapper.save(userPreferences, new DynamoDBSaveExpression().withExpectedEntry("username",
                new ExpectedAttributeValue(
                        new AttributeValue().withS(userPreferences.getUsername())
                )) );
    }
}
