package com.fridgetoplate.interfaces;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverted;
import com.fridgetoplate.utils.StringArrayConverter;



import com.fridgetoplate.model.Ingredient;
import com.fridgetoplate.utils.IngredientArrayConverter;

public class Recipe extends RecipeDesc {

    @DynamoDBAttribute
    private String recipeImage;

    @DynamoDBAttribute
    private Integer prepTime;

    @DynamoDBAttribute
    private Integer numberOfServings;

    @DynamoDBAttribute
    @DynamoDBTypeConverted(converter = IngredientArrayConverter.class)
    private Ingredient[] ingredients;
    
    @DynamoDBAttribute
    @DynamoDBTypeConverted(converter = StringArrayConverter.class)
    private String[] instructions;

    @DynamoDBAttribute
    private String creator;



}
