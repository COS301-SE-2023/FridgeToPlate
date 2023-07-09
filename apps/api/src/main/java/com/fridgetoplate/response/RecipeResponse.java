package com.fridgetoplate.response;

import java.util.List;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAutoGeneratedKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapperFieldModel;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTyped;
import com.fridgetoplate.interfaces.Recipe;
import com.fridgetoplate.model.Ingredient;
import com.fridgetoplate.model.Review;


public class RecipeResponse extends Recipe {

    private List<Review> reviews;
    private Integer views = 0;

    // Getter
    @DynamoDBAttribute(attributeName ="views")
    public List<Review> getReviews() {
        return reviews;
    }
    
    @DynamoDBHashKey(attributeName = "recipeId")
    @DynamoDBAutoGeneratedKey
    public String getRecipeId() {
        return recipeId;
    }

    @DynamoDBAttribute(attributeName = "recipe_image")
    public String getRecipeImage() {
        return recipeImage;
    }

    @DynamoDBAttribute(attributeName = "name")
    public String getName() {
        return name;
    }

    @DynamoDBAttribute(attributeName = "tags")
    public List<String> getTags() {
        return tags;
    }

    @DynamoDBAttribute(attributeName = "meal")
    public String getMeal() {
        return meal;
    }

    @DynamoDBAttribute(attributeName = "description")
    public String getDescription() {
        return description;
    }

    
    @DynamoDBAttribute(attributeName = "ingredients")
    @DynamoDBTyped(DynamoDBMapperFieldModel.DynamoDBAttributeType.L)
    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    @DynamoDBAttribute(attributeName = "instructions")
    public List<String> getInstructions() {
        return instructions;
    }

    @DynamoDBAttribute(attributeName = "prep_time")
    public Integer getPrepTime() {
        return prepTime;
    }

    @DynamoDBAttribute(attributeName = "number_of_Servings")
    public Integer getNumberOfServings() {
        return numberOfServings;
    }

    @DynamoDBAttribute(attributeName = "difficulty")
    public String getDifficulty() {
        return difficulty;
    }

    @DynamoDBAttribute(attributeName = "creator")
    public String getCreator() {
        return creator;
    }

    // Setter
    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    
    @DynamoDBAttribute(attributeName = "views")
    @DynamoDBTyped(DynamoDBMapperFieldModel.DynamoDBAttributeType.N)
    public Integer getViews() {
        return views;
    }

    // The setters

    public void setViews(Integer views) {
        this.views = views;
    }
}
