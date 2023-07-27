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
}
