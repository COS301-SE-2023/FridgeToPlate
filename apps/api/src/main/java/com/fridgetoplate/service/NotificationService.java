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
import com.fridgetoplate.utils.NotificationsUtils;
@Service
public class NotificationService {

    @Autowired
    private NotificationsRepository notificationsRepository;

    @Autowired
    private ProfileRepository profileRepository;

    private NotificationsUtils utils;

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

    @Scheduled(cron = "0 0 8 * * ?")
    public void breakfastNotificationsPush(){
        random.setSeed(System.currentTimeMillis());
        
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
        newNotification.setTitle(utils.breakfastTitleList[random.nextInt(0, utils.breakfastTitleList.length - 1)]);
        newNotification.setBody("Rise and shine!, a quick meal on the go or a full english breakfast - we have the recipe just for you.");

        System.out.println(newNotification.toString());
        this.save(newNotification);
        }        
    }

    @Scheduled(cron = "0 0 12 * * ?")
    public void lunchtimeNotificationsPush() {
        
        random.setSeed(System.currentTimeMillis());
        
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
        newNotification.setTitle(utils.lunchtimeTitleList[random.nextInt(0, utils.lunchtimeTitleList.length - 1)]);
        newNotification.setBody("Take a look at what we have cooking in our Recommendations");

        this.save(newNotification);
        }
    }

    @Scheduled(cron = "0 16 * * * ?")
    public void dinnertimeNotificationsPush() {
        
        random.setSeed(System.currentTimeMillis());
        
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
        newNotification.setTitle(utils.dinnertimeTitleList[random.nextInt(0, utils.dinnertimeTitleList.length - 1)]);
        newNotification.setBody("We get it, it's been a long day. Take a look at some of our quick to prepare dinner recipes for your next meal!");

        this.save(newNotification);
        }
    }

}