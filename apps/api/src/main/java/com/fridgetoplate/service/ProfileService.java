package com.fridgetoplate.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fridgetoplate.frontendmodels.ProfileFrontendModel;
import com.fridgetoplate.interfaces.RecipeDesc;
import com.fridgetoplate.model.ProfileModel;
import com.fridgetoplate.repository.ProfileRepository;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;
    
    @Autowired
    private RecipeService recipeService;

    @Autowired
    private MealPlanService mealPlanService;

    public ProfileFrontendModel save(ProfileFrontendModel profile) {
        ProfileModel model = new ProfileModel();
        model.setUsername(profile.getUsername());
        model.setDisplayName(profile.getDisplayName());
        model.setEmail(profile.getEmail());
        model.setProfilePic(profile.getProfilePic());

        profileRepository.save(model);

        return profile;
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
        List<RecipeDesc> savedRecipes = recipeService.getSavedRecipes(profileModel.getSavedRecipes());
        List<RecipeDesc> createdRecipes =  recipeService.getCreatedRecipes(username);
        String profilePicture = profileModel.getProfilePic();

        // Creating profile response
        profileResponse.setUsername(username);
        profileResponse.setDisplayName(displayName);
        profileResponse.setEmail(email);
        profileResponse.setSavedRecipes(savedRecipes);
        profileResponse.setCreatedRecipes(createdRecipes);
        profileResponse.setProfilePic(profilePicture);
            
        // saving meal plan response to profile response
        String date = LocalDate.now().toString();
        profileResponse.setCurrMealPlan(mealPlanService.findMealPlan(username, date));
        
       return profileResponse;
    }

    public ProfileFrontendModel update(String username, ProfileFrontendModel profile){

        //Retrieve the profile of the specified ID
        ProfileModel profileData = profileRepository.findByName(username);

        //Return null if user profile does not exist
        if(profileData == null)
            return null;
        
        if(profile.getDisplayName() != null) {
            profileData.setDisplayName(profile.getDisplayName());
        }

        if(profile.getProfilePic() != null) {
            profileData.setProfilePic(profile.getProfilePic());
        }

        if(profile.getEmail() != null) {
            profileData.setEmail(profile.getEmail());
        }

        if(profile.getSavedRecipes() != null) {
            profileData.setSavedRecipes(this.getSavedRecipeIds(profile.getSavedRecipes()));
        }
        
        profileRepository.update(username, profileData);

        return profile;
    }

    private List<String> getSavedRecipeIds(List<RecipeDesc> ids) {
        List<String> savedIds = new ArrayList<>();
        if(ids == null || ids.isEmpty()) {
            return savedIds;
        }

        for (RecipeDesc recipe : ids) {
            savedIds.add(recipe.getRecipeId());
        }
        return savedIds;
    }
}