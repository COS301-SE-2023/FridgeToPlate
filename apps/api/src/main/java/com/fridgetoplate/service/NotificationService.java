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
import com.fridgetoplate.model.ProfileModel;
@Service
public class NotificationService {

    @Autowired
    private NotificationsRepository notificationsRepository;

    @Autowired
    private ProfileService profileService;

    @Autowired
    private ExploreService exploreService;

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

        for (NotificationModel notificationModel : notifications) {
            if (notificationModel.getType().equals(type)) {
                System.out.println(notificationModel.toString());
                notificationsRepository.delete(notificationModel);
            }
        }
        
        return "Successfully cleared all " + type + " notifications";

    }

    @Scheduled(cron = "0 30 6 * * *")
    public void breakfastNotificationsPush(){
        random.setSeed(System.currentTimeMillis());
        
        List<ProfileModel> allUsers =  profileService.findAllUsers();
        List<ProfileModel> selectedUsers = new ArrayList();
        
        //1. Get random users
        for(; selectedUsers.size() < allUsers.size() * 0.6 ;){
            int index = random.nextInt(0, allUsers.size());
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
            
            int index = random.nextInt(0, allUsers.size());
            RecipeDesc currRecipeDesc = recipes.get(index);

            ProfileModel currentUser = selectedUsers.get(i);

            NotificationModel newNotification = new NotificationModel();
            
            newNotification.setUserId(currentUser.getUsername());
            newNotification.setNotificationPic(currRecipeDesc.getRecipeImage());
            newNotification.setType("recommendation");
            newNotification.setTitle("We recommend " + currRecipeDesc.getName() + " for breakfast today");
            newNotification.setBody("Good time to try a new breakfast recipe! Explore our collection and find something delicious to kickstart your day.");
            newNotification.setMetadata("/recipe/" + currRecipeDesc.getRecipeId());

            this.save(newNotification);
        }        
    }

    @Scheduled(cron = "0 0 12 * * *")
    public void lunchtimeNotificationsPush() {
        random.setSeed(System.currentTimeMillis());
        
        List<ProfileModel> allUsers =  profileService.findAllUsers();
        List<ProfileModel> selectedUsers = new ArrayList();
        
        //1. Get random users
        for(; selectedUsers.size() < allUsers.size() * 0.6 ;){
            int index = random.nextInt(0, allUsers.size());
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
            
            int index = random.nextInt(0, allUsers.size());
            RecipeDesc currRecipeDesc = recipes.get(index);

            ProfileModel currentUser = selectedUsers.get(i);

            NotificationModel newNotification = new NotificationModel();
            
            newNotification.setUserId(currentUser.getUsername());
            newNotification.setNotificationPic(currRecipeDesc.getRecipeImage());
            newNotification.setType("recommendation");
            newNotification.setTitle("Have a delicious " + currRecipeDesc.getName() + " for lunch today");
            newNotification.setBody("Lunch hour is approaching! Discover a tasty lunch recipe from our selection and enjoy a flavorful midday meal.");
            newNotification.setMetadata("/recipe/" + currRecipeDesc.getRecipeId());

            this.save(newNotification);
        }        
    }

    @Scheduled(cron = "0 0 17 * * *")
    public void dinnertimeNotificationsPush() {
        random.setSeed(System.currentTimeMillis());
        
        List<ProfileModel> allUsers =  profileService.findAllUsers();
        List<ProfileModel> selectedUsers = new ArrayList();
        
        //1. Get random users
        for(; selectedUsers.size() < allUsers.size() * 0.6 ;){
            int index = random.nextInt(0, allUsers.size());
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
            
            int index = random.nextInt(0, allUsers.size());
            RecipeDesc currRecipeDesc = recipes.get(index);

            ProfileModel currentUser = selectedUsers.get(i);

            NotificationModel newNotification = new NotificationModel();
            
            newNotification.setUserId(currentUser.getUsername());
            newNotification.setNotificationPic(currRecipeDesc.getRecipeImage());
            newNotification.setType("recommendation");
            newNotification.setTitle("Why not try " + currRecipeDesc.getName() + " for dinner today");
            newNotification.setBody("Dinnertime is here! Explore our variety of dinner recipes and cook up something special for your evening.");
            newNotification.setMetadata("/recipe/" + currRecipeDesc.getRecipeId());

            this.save(newNotification);
        }        
    }

}