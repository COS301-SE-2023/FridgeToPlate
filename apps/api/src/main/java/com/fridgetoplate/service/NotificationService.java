package com.fridgetoplate.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public NotificationsResponseModel findAllNotifications(String userId){

        NotificationsResponseModel response = new NotificationsResponseModel();
        List<NotificationModel> notifications = notificationsRepository.findAllByUser(userId);

        for (NotificationModel notificationModel : notifications) {
            if (notificationModel.getType().equals("recommend")) {
                response.getRecommendations().add(notificationModel);
            } else {
                response.getGeneral().add(notificationModel);
            }
        }

        return response;
    }

    public String clearNotifications(String userId) {
        
        List<NotificationModel> notifications = notificationsRepository.findAllByUser(userId);
        notificationsRepository.deleteAll(notifications);
        return "Successfully cleared notifications";

    }

    public String clearAllNotificationOfType(String userId, String type){

        List<NotificationModel> notifications = notificationsRepository.findAllByUser(userId);

        List<NotificationModel> deletableNotifications = new ArrayList<>();
        for (NotificationModel notificationModel : notifications) {
            if (notificationModel.getType().equals(type)) {
                deletableNotifications.add(notificationModel);
            }
        }
        
        notificationsRepository.deleteAll(deletableNotifications);
        return "Successfully cleared all " + type + " notifications";

    }
}