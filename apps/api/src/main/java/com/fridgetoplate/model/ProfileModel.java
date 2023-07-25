package com.fridgetoplate.model;

import java.util.List;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import com.fridgetoplate.interfaces.Profile;

@DynamoDBTable(tableName = "recipes")
public class ProfileModel extends Profile {

    private List<String> savedRecipeIds;

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
    public List<String> getSavedRecipes() {
        return savedRecipeIds;
    }

    // setters
    public void setSavedRecipes(List<String> savedRecipeIds) {
        this.savedRecipeIds = savedRecipeIds;
    }

    
}
