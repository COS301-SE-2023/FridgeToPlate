package com.fridgetoplate.interfaces;

import java.util.List;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBDocument;
import com.fridgetoplate.model.Ingredient;

import lombok.Data;

@Data
@DynamoDBDocument
public class Recommend {
    
    protected String username;

    protected List<Ingredient> ingredients;

    protected RecipePreferences recipePreferences;
}
