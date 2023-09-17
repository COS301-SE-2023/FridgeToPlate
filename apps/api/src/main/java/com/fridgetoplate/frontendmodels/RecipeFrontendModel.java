package com.fridgetoplate.frontendmodels;

import java.util.List;

import com.fridgetoplate.interfaces.Recipe;
import com.fridgetoplate.model.Ingredient;
import com.fridgetoplate.model.Review;

public class RecipeFrontendModel extends Recipe {

    private List<Review> reviews;

    private List<Ingredient> ingredients;

    public String getRecipeId() {
        return recipeId;
    }

    public String getRecipeImage() {
        return recipeImage;
    }

    public String getName() {
        return name;
    }

    public Double getRating() {
        return rating;
    }

    public List<String> getTags() {
        return tags;
    }

    public String getMeal() {
        return meal;
    }
    
    public String getDescription() {
        return description;
    }
    
    public List<Ingredient> getIngredients() {
        return ingredients;
    }
    
    public List<String> getSteps() {
        return steps;
    }
    
    public Integer getPrepTime() {
        return prepTime;
    }
    
    public Integer getServings() {
        return servings;
    }
    
    public String getDifficulty() {
        return difficulty;
    }
    
    public String getCreator() {
        return creator;
    }
    
    public List<Review> getReviews(){
        return this.reviews;
    }

    public String getYoutubeId() {
        return youtubeId;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }
}
