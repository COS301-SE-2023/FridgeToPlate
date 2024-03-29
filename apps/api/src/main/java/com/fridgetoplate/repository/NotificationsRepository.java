package com.fridgetoplate.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.fridgetoplate.model.NotificationModel;

import graphql.com.google.common.collect.ImmutableMap;

@Repository
public class NotificationsRepository {
    
    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    public NotificationModel save(NotificationModel notification){
        dynamoDBMapper.save(notification);
        return notification;
    }

    public List<NotificationModel> findAllByUser(String userId){
        DynamoDBQueryExpression<NotificationModel> query = new DynamoDBQueryExpression<NotificationModel>();
            query.setKeyConditionExpression("userId = :id");
            query.withExpressionAttributeValues(ImmutableMap.of(":id", new AttributeValue().withS(userId)));

        return dynamoDBMapper.query(NotificationModel.class, query);
    }

    public void delete(NotificationModel notification){
        dynamoDBMapper.delete(notification);
    }

    public void deleteAll(List<NotificationModel> notifications){
        dynamoDBMapper.batchDelete(notifications);
    }

}
