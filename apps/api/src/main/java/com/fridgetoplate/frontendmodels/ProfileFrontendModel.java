package com.fridgetoplate.frontendmodels;

import java.util.List;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapperFieldModel;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTyped;
import com.fridgetoplate.interfaces.Profile;
import com.fridgetoplate.interfaces.RecipeDesc;;
@DynamoDBTable(tableName = "profiles")
public class ProfileFrontendModel extends Profile {
    
    public MealPlanFrontendModel currMealPlan;

    public List<RecipeDesc> savedRecipes;

    public List<RecipeDesc> createdRecipes;

    @DynamoDBHashKey(attributeName = "username")
    public String getUsername() {
        return username;
    }

    @DynamoDBAttribute(attributeName = "email")
    public String getEmail() {
        return email;
    }

    @DynamoDBAttribute(attributeName = "display_name")
    public String getDisplayName() {
        return displayName;
    }

    @DynamoDBAttribute(attributeName = "profile_picture")
    public String getProfilePicture() {
        return profilePicture;
    }


    @DynamoDBAttribute(attributeName = "saved_recipes")
    public List<RecipeDesc> getSavedRecipes() {
        return savedRecipes;
    }

    // setters
    public void setSavedRecipes(List<RecipeDesc> savedRecipes) {
        this.savedRecipes = savedRecipes;
    }

    @DynamoDBAttribute(attributeName = "created_recipes")
    public List<RecipeDesc> getCreatedRecipes() {
        return createdRecipes;
    }

    @DynamoDBTyped(DynamoDBMapperFieldModel.DynamoDBAttributeType.M)
    @DynamoDBAttribute(attributeName = "meal_plans")
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
