package com.fridgetoplate.frontendmodels;

public class RecipePreferencesFrontendModel {

    private String difficulty;
    private String meal;
    private String servings;
    private String rating;
    private String[] keyword;
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

    public String[] getKeyword() {
        return keyword;
    }

    public String getPrepTime() {
        return prepTime;
    }

}