package com.fridgetoplate.response;

import com.fridgetoplate.interfaces.Profile;
import com.fridgetoplate.interfaces.RecipeDesc;

public class ProfileResponse extends Profile{
    
    public MealPlanResponse currMealPlan;

    public RecipeDesc[] savedRecipe;

    public RecipeDesc[] createdRecipes;

}
