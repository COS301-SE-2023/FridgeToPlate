package com.fridgetoplate.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAutoGeneratedKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverted;
import com.fridgetoplate.utils.StringArrayConverter;
import com.fridgetoplate.utils.IngredientArrayConverter;

import lombok.Data;

@Data
@DynamoDBTable(tableName = "recipes")
public class Recipe {

     @DynamoDBHashKey
    @DynamoDBAutoGeneratedKey
    private String recipeId;
    
    @DynamoDBAttribute
    private String name;

    @DynamoDBAttribute
    private String recipeImage;

    @DynamoDBAttribute
    private String difficulty;

    @DynamoDBAttribute
    private Integer prepTime;

    @DynamoDBAttribute
    private Integer numberOfServings;

    @DynamoDBAttribute
    @DynamoDBTypeConverted(converter = StringArrayConverter.class)
    private String[] tags;

    @DynamoDBAttribute
    @DynamoDBTypeConverted(converter = IngredientArrayConverter.class)
    private Ingredient[] ingredients;

    @DynamoDBAttribute
    @DynamoDBTypeConverted(converter = StringArrayConverter.class)
    private String[] instructions;



}
