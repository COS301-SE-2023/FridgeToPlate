package com.fridgetoplate.model;

import java.util.List;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAutoGeneratedKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapperFieldModel;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTyped;
import com.fridgetoplate.interfaces.Ingredient;
import com.fridgetoplate.interfaces.Recipe;

@DynamoDBTable(tableName = "recipes")
public class RecipeModel extends Recipe {

    private Integer views = 0;

    // The getters
    @DynamoDBHashKey(attributeName = "recipeId")
    @DynamoDBAutoGeneratedKey
    public String getRecipeId() {
        return recipeId;
    }

    @DynamoDBAttribute(attributeName = "recipeImage")
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

    @DynamoDBAttribute(attributeName = "steps")
    public List<String> getSteps() {
        return steps;
    }

    @DynamoDBAttribute(attributeName = "prepTime")
    public Integer getPrepTime() {
        return prepTime;
    }

    @DynamoDBAttribute(attributeName = "servings")
    public Integer getServings() {
        return servings;
    }

    @DynamoDBAttribute(attributeName = "difficulty")
    public String getDifficulty() {
        return difficulty;
    }

    @DynamoDBAttribute(attributeName = "creator")
    public String getCreator() {
        return creator;
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
