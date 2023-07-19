package com.fridgetoplate.frontendmodels;

import java.util.List;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapperFieldModel;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTyped;
import com.fridgetoplate.interfaces.Recipe;
import com.fridgetoplate.model.Ingredient;
import com.fridgetoplate.model.Review;


public class RecipeFrontendModel extends Recipe {

    private List<Review> reviews;

    // Getter
    public List<Review> getReviews() {
        return reviews;
    }
    
    public String getRecipeId() {
        return recipeId;
    }

    public String getRecipeImage() {
        return recipeImage;
    }

    public String getName() {
        return name;
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

    @DynamoDBTyped(DynamoDBMapperFieldModel.DynamoDBAttributeType.L)
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

    // Setter
    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }
}
