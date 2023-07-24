package com.fridgetoplate.repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.PaginatedScanList;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.fridgetoplate.model.NotificationModel;

@Repository
public class NotificationsRepository {
    
    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    public NotificationModel save(NotificationModel notification){
        dynamoDBMapper.save(notification);
        return notification;
    }

    public List<NotificationModel> findAll(String userId){
        
        List<NotificationModel> notifications = new ArrayList<>();

        HashMap<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        eav.put(":userId", new AttributeValue().withS(userId));

        DynamoDBScanExpression scanExpression = new DynamoDBScanExpression().withFilterExpression("userId=:userId").withExpressionAttributeValues(eav);

        PaginatedScanList <NotificationModel> scanResult = dynamoDBMapper.scan(NotificationModel.class, scanExpression);
        
        for (NotificationModel notification : scanResult) {
            
                if(notification != null) {
                    notifications.add(notification);
                }
        }

        return notifications;
    }

    public String delete(String notificationId){
        NotificationModel notification = dynamoDBMapper.load(NotificationModel.class, notificationId);
        
        dynamoDBMapper.delete(notification);

        return "Notification deleted successfully:: " + notificationId;
    }

    public String clearNotifications(String userId){
        List<NotificationModel> notifications = new ArrayList<>();

        HashMap<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        eav.put(":userId", new AttributeValue().withS(userId));

        DynamoDBScanExpression scanExpression = new DynamoDBScanExpression().withFilterExpression("userId=:userId").withExpressionAttributeValues(eav);

        PaginatedScanList <NotificationModel> scanResult = dynamoDBMapper.scan(NotificationModel.class, scanExpression);
        
        for(int i = 0; i < scanResult.size(); i++){
            this.delete( scanResult.get(i).getNotificationId() );
        }

        return "Notifications for " + userId + " deleted successfully";
    }

}
