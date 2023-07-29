package com.fridgetoplate.model;

import java.util.List;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapperFieldModel;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTyped;

import lombok.Data;

@Data
@DynamoDBTable(tableName = "recommends")
public class RecommendModel {

    @DynamoDBAttribute(attributeName = "usernname")
    private String username;

    @DynamoDBAttribute(attributeName = "ingredients")
    private List<Ingredient> ingredients;

    @DynamoDBAttribute(attributeName = "recipe_preferences")
    @DynamoDBTyped(DynamoDBMapperFieldModel.DynamoDBAttributeType.M)
    private RecipePreferences recipePrefernces;

}
