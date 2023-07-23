package com.fridgetoplate.interfaces;

import java.util.List;
import com.fridgetoplate.model.Ingredient;

public class Recipe extends RecipeDesc {

    protected String description;

    protected String meal;

    protected Integer prepTime;

    protected Integer servings;

    protected List<Ingredient> ingredients;

    protected List<String> steps;

    protected String creator;

    // Setters
    public void setDescription(String description) {
        this.description = description;
    }
    
    public void setMeal(String meal) {
        this.meal = meal;
    }

    public void setPrepTime(Integer prepTime) {
        this.prepTime = prepTime;
    }

    public void setServings(Integer servings) {
        this.servings = servings;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    public void setSteps(List<String> steps) {
        this.steps = steps;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

}
