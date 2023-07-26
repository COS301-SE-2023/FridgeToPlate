package com.fridgetoplate.model;
import java.util.List;
import lombok.Data;

@Data
public class RecipePreferences {

    private String difficulty;

    private String meal;

    private String servings;

    private String rating;

    private List<String> keywords;

    private String prepTime;
}
