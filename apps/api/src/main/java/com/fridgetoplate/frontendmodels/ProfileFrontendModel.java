package com.fridgetoplate.frontendmodels;

import java.util.List;

import com.fridgetoplate.interfaces.Profile;
import com.fridgetoplate.interfaces.RecipeDesc;;

public class ProfileFrontendModel extends Profile {
    
    public MealPlanFrontendModel currMealPlan;

    public List<RecipeDesc> savedRecipes;

    public List<RecipeDesc> createdRecipes;

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getProfilePic() {
        return profilePic;
    }

    public List<RecipeDesc> getSavedRecipes() {
        return savedRecipes;
    }

    // setters
    public void setSavedRecipes(List<RecipeDesc> savedRecipes) {
        this.savedRecipes = savedRecipes;
    }

    public List<RecipeDesc> getCreatedRecipes() {
        return createdRecipes;
    }

    public MealPlanFrontendModel getCurrMealPlan() {
        return currMealPlan;
    }

    public void setCurrMealPlan(MealPlanFrontendModel currMealPlan) {
        this.currMealPlan = currMealPlan;
    }

    public void setCreatedRecipes(List<RecipeDesc> createdRecipes) {
        this.createdRecipes = createdRecipes;
    }


}
