package com.fridgetoplate.interfaces;

import com.fridgetoplate.model.Ingredient;
import com.fridgetoplate.model.RecipePreferences;

import lombok.Data;

@Data
public class Recommend {
    
    private String username;

    private Ingredient[] ingredients;

    private RecipePreferences recipePreferences;
}
