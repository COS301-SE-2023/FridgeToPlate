package com.fridgetoplate.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.time.LocalTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.PaginatedScanList;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.fridgetoplate.frontendmodels.NotificationsResponseModel;
import com.fridgetoplate.model.NotificationModel;
import com.fridgetoplate.repository.NotificationsRepository;

@Service
public class NotificationService {

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


        // Updated Function to simply scan the database
        PaginatedScanList <NotificationModel> scanResult = notificationsRepository.findAll(userId, eav);
        

        String message;
        // Get the current time
        LocalTime currentTime = LocalTime.now();

        // Define time ranges for morning, afternoon, and evening
        LocalTime morningStart = LocalTime.of(6, 0);
        LocalTime afternoonStart = LocalTime.of(12, 0);
        LocalTime eveningStart = LocalTime.of(18, 0);
        String logo = "/assets/Final Logo.png";

        // Compare the current time with the defined time ranges
        if (currentTime.isAfter(morningStart) && currentTime.isBefore(afternoonStart)) {
            message = "Wake up and smell the roses! Try out this wonderful breakfast dish.";
        } else if (currentTime.isAfter(afternoonStart) && currentTime.isBefore(eveningStart)) {
            message = "Fighting the days battles? Try out this amazing lunch recipe.";
        } else {
            message = "Had a long day? Try out this warm diner plate.";
        }

        NotificationModel timeRecommendNotification = new NotificationModel();
        timeRecommendNotification.setUserId(userId);
        timeRecommendNotification.setComment(message);
        timeRecommendNotification.setUserName(userId);
        timeRecommendNotification.setProfilePictureUrl(logo);
        timeRecommendNotification.setNotificationType("recommendation");
        timeRecommendNotification.setNotificationId("timeRecommendation");
        
        recommendationNotifications.add(timeRecommendNotification);

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

        return notificationsRepository.delete(notificationId);

    }

    public String clearNotifications(String userId){

        HashMap<String, AttributeValue> eav = new HashMap<String, AttributeValue>();

        eav.put(":userId", new AttributeValue().withS(userId));

        PaginatedScanList <NotificationModel> scanResult = notificationsRepository.clearNotifications(userId, eav);

        for(int i = 0; i < scanResult.size(); i++){
            notificationsRepository.delete( scanResult.get(i).getNotificationId() );
        }

        return "Notifications for " + userId + " deleted successfully";

    }

    public String clearAllNotificationOfType(String userId, String type){

        HashMap<String, AttributeValue> eav = new HashMap<String, AttributeValue>();

        eav.put(":userId", new AttributeValue().withS(userId));
        eav.put(":notificationType", new AttributeValue().withS(type));

        PaginatedScanList <NotificationModel> scanResult = notificationsRepository.clearAllNotificationOfType(userId, type, eav);

        for(int i = 0; i < scanResult.size(); i++){
            notificationsRepository.delete( scanResult.get(i).getNotificationId() );
        }

        return "All "+ type + " Notifications for " + userId + " deleted successfully";

    }
}