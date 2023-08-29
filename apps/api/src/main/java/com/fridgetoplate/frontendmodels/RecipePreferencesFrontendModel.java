package com.fridgetoplate.frontendmodels;

import com.fridgetoplate.interfaces.Ingredient;

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

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }
    
    public void setMeal(String meal) {
        this.meal = meal;
    }

    public void setServings(String servings) {
        this.servings = servings;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public void setKeywords(String[] keywords) {
        this.keywords = keywords;
    }

    public void setPrepTime(String prepTime) {
        this.prepTime = prepTime;
    }
}