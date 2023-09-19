package com.fridgetoplate.model;

import java.util.List;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import com.fridgetoplate.interfaces.RecipePreferences;
import com.fridgetoplate.interfaces.Recommend;

@DynamoDBTable(tableName = "recommends")
public class RecommendModel extends Recommend{

    
    @DynamoDBHashKey(attributeName = "username")
    public String getUsername(){
        return username;
    }

    @DynamoDBAttribute(attributeName = "ingredients")
    public List<Ingredient> getIngredients(){
        return ingredients;
    }

    @DynamoDBAttribute(attributeName = "recipe_preferences")
    private RecipePreferences recipePrefernces;

}
