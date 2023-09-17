package com.fridgetoplate.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.fridgetoplate.frontendmodels.NotificationsResponseModel;
import com.fridgetoplate.model.NotificationModel;
import com.fridgetoplate.repository.NotificationsRepository;
import com.fridgetoplate.repository.ProfileRepository;
import com.fridgetoplate.model.ProfileModel;

@Service
public class NotificationService {

    @Autowired
    private NotificationsRepository notificationsRepository;

    @Autowired
    private ProfileRepository profileRepository;

    Random random = new Random();

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

    @Scheduled(fixedRate = 5000)
    public void execute() {
        
        random.setSeed(System.currentTimeMillis());

        System.out.println("Code is being run....");
        
        List<ProfileModel> allUsers =  profileRepository.findAllUsers();
        List<ProfileModel> selectedUsers = new ArrayList();
        
        //1. Get random users
        for(; selectedUsers.size() < allUsers.size() * 0.6 ;){
            int index = random.nextInt(0, allUsers.size());
            ProfileModel currentProfile = allUsers.get(index);
            
            if(!selectedUsers.contains(currentProfile)){
                selectedUsers.add(currentProfile);
            }
        }

        // 2. Create notifications
        for(int i = 0; i < selectedUsers.size(); i++){
        
        ProfileModel currentUser = selectedUsers.get(i);

        NotificationModel newNotification = new NotificationModel();
         
        newNotification.setUserId(currentUser.getUsername());
        newNotification.setNotificationPic("https://www.pngitem.com/pimgs/m/24-248366_profile-clipart-generic-user-generic-profile-picture-gender.png");
        newNotification.setType("recommendation");
        newNotification.setTitle("Lunch is served, 'burrito'-tifully! 🌯🍴");
        newNotification.setBody("Don't panic, we have you covered for your lunchtime");

        System.out.println(newNotification.toString());
        this.save(newNotification);
        }
    }
}