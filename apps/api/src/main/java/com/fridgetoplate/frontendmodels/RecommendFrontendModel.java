package com.fridgetoplate.frontendmodels;

import com.fridgetoplate.model.Ingredient;

public class RecommendFrontendModel {
    private String username;
    private Ingredient[] ingredients;
    private RecipePreferencesFrontendModel recipePreferences;

    public Ingredient[] getIngredients() {
        return ingredients;
    }

    public String getUsername() {
        return username;
    }

    public RecipePreferencesFrontendModel getRecipePreferences() {
        return recipePreferences;
    }

    public void setUsername(String username){
        this.username = username;
    }

    public void setIngredients(Ingredient[] ingredients){
        this.ingredients = ingredients;
    }

    public void setPreferences(RecipePreferencesFrontendModel preferences){
        this.recipePreferences = preferences;
    }
}
