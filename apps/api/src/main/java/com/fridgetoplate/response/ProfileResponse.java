package com.fridgetoplate.response;

import com.fridgetoplate.interfaces.Profile;
import com.fridgetoplate.interfaces.RecipeDesc;
import com.fridgetoplate.model.MealPlan;

public class ProfileResponse extends Profile{
    
    public MealPlan currMealPlan;

    public RecipeDesc[] savedRecipe;

    public RecipeDesc[] createdRecipes;


}
