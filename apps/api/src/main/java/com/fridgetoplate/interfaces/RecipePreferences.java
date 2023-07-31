package com.fridgetoplate.interfaces;
import java.util.List;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBDocument;

import lombok.Data;

@Data
@DynamoDBDocument
public class RecipePreferences {

    private String difficulty;

    private String meal;

    private String servings;

    private String rating;

    private List<String> keywords;

    private String prepTime;
}
