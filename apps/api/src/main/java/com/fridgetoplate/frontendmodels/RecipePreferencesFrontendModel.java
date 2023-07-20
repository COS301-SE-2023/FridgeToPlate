package com.fridgetoplate.frontendmodels;

import com.fridgetoplate.interfaces.Difficulty;

public class RecipePreferencesFrontendModel {

    private Difficulty difficulty;
    private Difficulty meal;
    private Difficulty servings;
    private Difficulty rating;
    private String[] keyword;
    private Difficulty prepTime;

    public Difficulty getDifficulty() {
        return difficulty;
    }
    
    public Difficulty getMeal() {
        return meal;
    }

    public Difficulty getServings() {
        return servings;
    }

    public Difficulty getRating() {
        return rating;
    }

    public String[] getKeyword() {
        return keyword;
    }

    public Difficulty getPrepTime() {
        return prepTime;
    }

}