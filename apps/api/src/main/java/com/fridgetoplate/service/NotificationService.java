package com.fridgetoplate.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.fridgetoplate.frontendmodels.NotificationsResponseModel;
import com.fridgetoplate.interfaces.Explore;
import com.fridgetoplate.interfaces.RecipeDesc;
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
    private ProfileService profileService;

    @Autowired
    private ExploreService exploreService;

    private NotificationsUtils utils = new NotificationsUtils();

    Random random = new Random();

    public NotificationModel save(NotificationModel notification){
        notificationsRepository.save(notification);
        return notification;
    }

    public NotificationsResponseModel findAllNotifications(String userId){

        NotificationsResponseModel response = new NotificationsResponseModel();
        List<NotificationModel> notifications = notificationsRepository.findAllByUser(userId);
        List<NotificationModel> generalNotifications = new ArrayList<>();
        List<NotificationModel> recommendNotifications = new ArrayList<>();
        

        for (NotificationModel notificationModel : notifications) {
            if (notificationModel.getType().equals("recommendation")) {
                recommendNotifications.add(notificationModel);
            } else {
                generalNotifications.add(notificationModel);
            }
        }

        response.setRecommendations(recommendNotifications);
        response.setGeneral(generalNotifications);
        
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
        
        List<ProfileModel> allUsers =  profileService.findAllUsers();
        List<ProfileModel> selectedUsers = new ArrayList();
        
        //1. Get random users
        for(; selectedUsers.size() < allUsers.size() * 0.6 ;){
            int index = random.nextInt(allUsers.size());
            ProfileModel currentProfile = allUsers.get(index);
            
            if(!selectedUsers.contains(currentProfile)){
                selectedUsers.add(currentProfile);
            }
        }

        // 2. Get Recipes
        Explore explore = new Explore();
        explore.setType("breakfast");
        explore.setSearch("");
        explore.setDifficulty("");
        List<RecipeDesc> recipes = exploreService.findBySearch(explore);

        // 3. Create notifications
        for(int i = 0; i < selectedUsers.size(); i++){
            
            int index = random.nextInt(allUsers.size());
            RecipeDesc currRecipeDesc = recipes.get(index);

            ProfileModel currentUser = selectedUsers.get(i);

            NotificationModel newNotification = new NotificationModel();
            
            newNotification.setUserId(currentUser.getUsername());
            newNotification.setNotificationPic(currRecipeDesc.getRecipeImage());
            newNotification.setType("recommendation");
            newNotification.setTitle("We recommend " + currRecipeDesc.getRecipeImage() + " for breakfast today");
            newNotification.setBody("Good time to try a new breakfast recipe! Explore our collection and find something delicious to kickstart your day.");

            System.out.println(newNotification.toString());
            this.save(newNotification);
        }        
    }

    @Scheduled(cron = "0 0 12 * * ?")
    public void lunchtimeNotificationsPush() {
        random.setSeed(System.currentTimeMillis());
        
        List<ProfileModel> allUsers =  profileService.findAllUsers();
        List<ProfileModel> selectedUsers = new ArrayList();
        
        //1. Get random users
        for(; selectedUsers.size() < allUsers.size() * 0.6 ;){
            int index = random.nextInt(allUsers.size());
            ProfileModel currentProfile = allUsers.get(index);
            
            if(!selectedUsers.contains(currentProfile)){
                selectedUsers.add(currentProfile);
            }
        }

        // 2. Get Recipes
        Explore explore = new Explore();
        explore.setType("lunch");
        explore.setSearch("");
        explore.setDifficulty("");
        List<RecipeDesc> recipes = exploreService.findBySearch(explore);

        // 3. Create notifications
        for(int i = 0; i < selectedUsers.size(); i++){
            
            int index = random.nextInt(allUsers.size());
            RecipeDesc currRecipeDesc = recipes.get(index);

            ProfileModel currentUser = selectedUsers.get(i);

            NotificationModel newNotification = new NotificationModel();
            
            newNotification.setUserId(currentUser.getUsername());
            newNotification.setNotificationPic(currRecipeDesc.getRecipeImage());
            newNotification.setType("recommendation");
            newNotification.setTitle("Have a delicious " + currRecipeDesc.getRecipeImage() + " for lunch today");
            newNotification.setBody("Lunch hour is approaching! Discover a tasty lunch recipe from our selection and enjoy a flavorful midday meal.");

            System.out.println(newNotification.toString());
            this.save(newNotification);
        }        
    }

    @Scheduled(cron = "0 16 * * * ?")
    public void dinnertimeNotificationsPush() {
        random.setSeed(System.currentTimeMillis());
        
        List<ProfileModel> allUsers =  profileService.findAllUsers();
        List<ProfileModel> selectedUsers = new ArrayList();
        
        //1. Get random users
        for(; selectedUsers.size() < allUsers.size() * 0.6 ;){
            int index = random.nextInt(allUsers.size());
            ProfileModel currentProfile = allUsers.get(index);
            
            if(!selectedUsers.contains(currentProfile)){
                selectedUsers.add(currentProfile);
            }
        }

        // 2. Get Recipes
        Explore explore = new Explore();
        explore.setType("dinner");
        explore.setSearch("");
        explore.setDifficulty("");
        List<RecipeDesc> recipes = exploreService.findBySearch(explore);

        // 3. Create notifications
        for(int i = 0; i < selectedUsers.size(); i++){
            
            int index = random.nextInt(allUsers.size());
            RecipeDesc currRecipeDesc = recipes.get(index);

            ProfileModel currentUser = selectedUsers.get(i);

            NotificationModel newNotification = new NotificationModel();
            
            newNotification.setUserId(currentUser.getUsername());
            newNotification.setNotificationPic(currRecipeDesc.getRecipeImage());
            newNotification.setType("recommendation");
            newNotification.setTitle("Why not try " + currRecipeDesc.getRecipeImage() + " for dinner today");
            newNotification.setBody("Dinnertime is here! Explore our variety of dinner recipes and cook up something special for your evening.");

            System.out.println(newNotification.toString());
            this.save(newNotification);
        }        
    }

}