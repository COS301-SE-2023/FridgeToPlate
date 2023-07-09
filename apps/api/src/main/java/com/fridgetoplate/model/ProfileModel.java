package com.fridgetoplate.model;

import java.util.List;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import com.fridgetoplate.interfaces.Profile;


@DynamoDBTable(tableName = "profiles")
public class ProfileModel extends Profile {

    private List<String> savedRecipes;

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

    @DynamoDBAttribute(attributeName = "ingredients")
    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    @DynamoDBAttribute(attributeName = "savedRecipes")
    public List<String> getSavedRecipes() {
        return savedRecipes;
    }


    // setters
    @DynamoDBAttribute(attributeName = "savedRecipes")
    public void setSavedRecipes(List<String> savedRecipes) {
        this.savedRecipes = savedRecipes;
    }

    
}
