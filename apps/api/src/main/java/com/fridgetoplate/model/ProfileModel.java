package com.fridgetoplate.model;

import java.util.List;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBDocument;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.fridgetoplate.interfaces.Profile;
import com.fridgetoplate.interfaces.RecipeDesc;


@DynamoDBDocument
public class ProfileModel extends Profile {

    private List<RecipeDesc> savedRecipes;

    @DynamoDBHashKey(attributeName = "username")
    public String getUsername() {
        return username;
    }

    @DynamoDBAttribute(attributeName = "email")
    public String getEmail() {
        return email;
    }

    @DynamoDBAttribute(attributeName = "displayName")
    public String getDisplayName() {
        return displayName;
    }

    @DynamoDBAttribute(attributeName = "profilePicture")
    public String getProfilePicture() {
        return profilePicture;
    }

    @DynamoDBAttribute(attributeName = "savedRecipes")
    public List<RecipeDesc> getSavedRecipes() {
        return savedRecipes;
    }


    // setters
    public void setSavedRecipes(List<RecipeDesc> savedRecipes) {
        this.savedRecipes = savedRecipes;
    }

    
}
