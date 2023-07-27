package com.fridgetoplate.frontendmodels;

import com.fridgetoplate.model.Ingredient;

public class RecipePreferencesFrontendModel {

    private String difficulty;
    private String meal;
    private String servings;
    private String rating;
    private String[] keywords;
    private String prepTime;

    public String getDifficulty() {
        return difficulty;
    }
    
    public String getMeal() {
        return meal;
    }

    public String getServings() {
        return servings;
    }

    public String getRating() {
        return rating;
    }

    public String[] getKeywords() {
        return keywords;
    }

    public String getPrepTime() {
        return prepTime;
    }
}