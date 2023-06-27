package com.fridgetoplate.model;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAutoGeneratedKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverted;
import com.fridgetoplate.utils.IngredientArrayConverter;
import com.fridgetoplate.utils.RecipeArrayConverter;

import lombok.Data;

@Data
@DynamoDBTable(tableName = "profiles")
public class Profile {
    @DynamoDBHashKey
    @DynamoDBAutoGeneratedKey
    private String profileId;

    @DynamoDBAttribute
    private String username;

    @DynamoDBAttribute
    private String email;

    @DynamoDBAttribute
    private String displayName;

    @DynamoDBAttribute
    private String profilePicture;

    @DynamoDBAttribute
    @DynamoDBTypeConverted(converter = IngredientArrayConverter.class)
    private Ingredient[] ingredients;

    @DynamoDBAttribute
    @DynamoDBTypeConverted(converter = RecipeArrayConverter.class)
    private Recipe[] preferences;

    @DynamoDBAttribute
    @DynamoDBTypeConverted(converter = RecipeArrayConverter.class)
    private Recipe[] createdRecipes;
    
}