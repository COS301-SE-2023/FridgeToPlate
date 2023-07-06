package com.fridgetoplate.interfaces;

import java.util.List;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.fridgetoplate.model.Ingredient;

public class Recipe extends RecipeDesc {

    protected String description;

    protected String recipeImage;

    protected String meal;

    protected Integer prepTime;

    protected Integer numberOfServings;

    protected List<Ingredient> ingredients;

    protected List<String> instructions;

    protected String creator;

    // Setters
    public void setDescription(String description) {
        this.description = description;
    }

    public void setRecipeImage(String recipeImage) {
        this.recipeImage = recipeImage;
    }

    public void setMeal(String meal) {
        this.meal = meal;
    }

    public void setPrepTime(Integer prepTime) {
        this.prepTime = prepTime;
    }

    public void setNumberOfServings(Integer numberOfServings) {
        this.numberOfServings = numberOfServings;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    public void setInstructions(List<String> instructions) {
        this.instructions = instructions;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

}
