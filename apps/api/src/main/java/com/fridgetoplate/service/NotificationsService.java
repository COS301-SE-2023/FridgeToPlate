package com.fridgetoplate.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.PaginatedScanList;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.fridgetoplate.frontendmodels.NotificationsResponseModel;
import com.fridgetoplate.model.NotificationModel;
import com.fridgetoplate.repository.NotificationsRepository;

@Service
public class NotificationsService {

    @Autowired
    private NotificationsRepository notificationsRepository;
    

    public NotificationModel save(NotificationModel notification){
        notificationsRepository.save(notification);
        return notification;
    }

    public NotificationsResponseModel findAll(String userId){
        
        List<NotificationModel> generalNotifications = new ArrayList<>();

        List<NotificationModel> recommendationNotifications = new ArrayList<>();

        NotificationsResponseModel notifications = new NotificationsResponseModel();

        HashMap<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        eav.put(":userId", new AttributeValue().withS(userId));

        DynamoDBScanExpression scanExpression = new DynamoDBScanExpression().withFilterExpression("userId=:userId").withExpressionAttributeValues(eav);

        PaginatedScanList <NotificationModel> scanResult = dynamoDBMapper.scan(NotificationModel.class, scanExpression);
        
        for (NotificationModel notification : scanResult) {
            
                if(notification != null) {
                    if(notification.getNotificationType().equals("general"))
                        generalNotifications.add(notification);
                    else
                        recommendationNotifications.add(notification);
                }
        }

        notifications.setGeneral(generalNotifications);

        notifications.setRecommendations(recommendationNotifications);

        return notifications;
    }

    public String delete(String notificationId){
        NotificationModel notification = dynamoDBMapper.load(NotificationModel.class, notificationId);
        
        dynamoDBMapper.delete(notification);

        return "Notification deleted successfully " + notificationId;
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

    public String clearAllNotificationOfType(String userId, String type){
        List<NotificationModel> notifications = new ArrayList<>();

        HashMap<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        eav.put(":userId", new AttributeValue().withS(userId));
        eav.put(":notificationType", new AttributeValue().withS(type));

        return notificationsRepository.clearAllNotificationOfType(userId, type, eav);

    }
}