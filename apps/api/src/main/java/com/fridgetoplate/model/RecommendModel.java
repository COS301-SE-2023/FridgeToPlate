package com.fridgetoplate.model;

import java.util.List;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAutoGeneratedKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapperFieldModel;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTyped;
import com.fridgetoplate.interfaces.Recommend;

@DynamoDBTable(tableName = "recommends")
public class RecommendModel extends Recommend{

    @DynamoDBAttribute(attributeName = "userName")
    public String getUserName(){
        return username;
    }

    @DynamoDBAttribute(attributeName = "ingredients")
    public Ingredient[] getIngredients(){
        return ingredients;
    }

    @DynamoDBAttribute(attributeName = "recipe_preferences")
    @DynamoDBTyped(DynamoDBMapperFieldModel.DynamoDBAttributeType.M)
    private RecipePreferences recipePrefernces;

}
