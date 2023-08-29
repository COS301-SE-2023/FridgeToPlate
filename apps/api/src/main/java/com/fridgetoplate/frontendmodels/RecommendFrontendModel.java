package com.fridgetoplate.frontendmodels;

import java.util.List;

import com.fridgetoplate.interfaces.Ingredient;

public class RecommendFrontendModel {
    private String username;
    private List<Ingredient> ingredients;
    private RecipePreferencesFrontendModel recipePreferences;

    public List<Ingredient> getIngredients() {
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

    public void setIngredients(List<Ingredient> ingredients){
        this.ingredients = ingredients;
    }

    public void setPreferences(RecipePreferencesFrontendModel preferences){
        this.recipePreferences = preferences;
    }
}
