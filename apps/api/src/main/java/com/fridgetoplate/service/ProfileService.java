package com.fridgetoplate.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fridgetoplate.frontendmodels.MealPlanFrontendModel;
import com.fridgetoplate.frontendmodels.ProfileFrontendModel;
import com.fridgetoplate.interfaces.RecipeDesc;
import com.fridgetoplate.model.MealPlanModel;
import com.fridgetoplate.model.ProfileModel;
import com.fridgetoplate.model.RecipeModel;
import com.fridgetoplate.repository.MealPlanRepository;
import com.fridgetoplate.repository.ProfileRepository;
import com.fridgetoplate.repository.RecipeRepository;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;
    
    @Autowired
    private MealPlanRepository mealPlanRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    public ProfileFrontendModel save(ProfileFrontendModel profile) {
        return profileRepository.save(profile);
    }

    public ProfileFrontendModel findByName(String username) {
        /*
         * Getting the Profile Response
         */

         // Declaring the Profile Response object
         ProfileFrontendModel profileResponse = new ProfileFrontendModel();

             // Find the Profile model
        ProfileModel profileModel = profileRepository.findByName(username);

        if(profileModel == null) {
            return null;
        }

        // Getting profile attributes
        String displayName = profileModel.getDisplayName();
        String email = profileModel.getEmail();
        List<RecipeDesc> savedRecipes = this.getSavedRecipes(profileModel.getSavedRecipes());
        List<RecipeDesc> createdRecipes =  this.getCreateRecipes(username);
        String profilePicture = profileModel.getProfilePic();

        // Creating profile response
        profileResponse.setUsername(username);
        profileResponse.setDisplayName(displayName);
        profileResponse.setEmail(email);
        profileResponse.setSavedRecipes(savedRecipes);
        profileResponse.setCreatedRecipes(createdRecipes);
        profileResponse.setProfilePic(profilePicture);

         /*
          * Getting the MealPan response
          */

        // Find Meal
        String date = LocalDate.now().toString();
       
        MealPlanModel mealPlanModel = mealPlanRepository.find(username, date);

        if(mealPlanModel != null) {

            // Declare the response object
            MealPlanFrontendModel mealPlanResponse = new MealPlanFrontendModel();

            // creating response
            mealPlanResponse.setUsername(username);

            String breakFastId = mealPlanModel.getBreakfastId();

            RecipeDesc breakfast = null;
            if (breakFastId != null && breakFastId != "") {
                breakfast = recipeRepository.findById(breakFastId);
            } 

            String lunchId = mealPlanModel.getLunchId();
            RecipeDesc lunch = null;
            if (lunchId != null && lunchId != "") {
                lunch = recipeRepository.findById(lunchId);
            } 

            String dinnerId = mealPlanModel.getDinnerId();
            RecipeDesc dinner = null;
            if (dinnerId != null && dinnerId != "") {
                dinner = recipeRepository.findById(dinnerId);
            } 

            String snackId = mealPlanModel.getSnackId();
            RecipeDesc snack = null;
            if (snackId != null && snackId != "") {
                snack = recipeRepository.findById(snackId);
            } 

            // Creating the mealPlanResponse
            mealPlanResponse.setDate(date);
            mealPlanResponse.setBreakfast(breakfast);
            mealPlanResponse.setLunch(lunch);
            mealPlanResponse.setDinner(dinner);
            mealPlanResponse.setSnack(snack);
            
            // saving meal plan response to profile response
            profileResponse.setCurrMealPlan(mealPlanResponse);
        } else {
            profileResponse.setCurrMealPlan(null);
        }
        
       return profileResponse;
    }
}