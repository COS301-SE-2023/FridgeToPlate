package com.fridgetoplate.interfaces;

import com.fridgetoplate.model.Ingredient;
import com.fridgetoplate.model.RecipePreferences;

import lombok.Data;

@Data
public class Recommend {
    
    protected String username;

    protected Ingredient[] ingredients;

    protected RecipePreferences recipePreferences;
}
