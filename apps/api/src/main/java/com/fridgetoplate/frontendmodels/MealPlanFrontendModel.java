package com.fridgetoplate.frontendmodels;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapperFieldModel;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBRangeKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTyped;
import com.fridgetoplate.interfaces.MealPlan;
import com.fridgetoplate.interfaces.RecipeDesc;


public class MealPlanFrontendModel extends MealPlan{
    
  
    private RecipeDesc breakfast;

    private RecipeDesc lunch;

    private RecipeDesc dinner;

    private RecipeDesc snack;

    // getters

    @DynamoDBHashKey(attributeName = "username")
    public String getUsername() {
        return username;
    }

    @DynamoDBRangeKey(attributeName = "date")
    public String getDate() {
        return date;
    }

    @DynamoDBAttribute(attributeName = "breakfast")
    @DynamoDBTyped(DynamoDBMapperFieldModel.DynamoDBAttributeType.M)
    public RecipeDesc getBreakfast() {
        return breakfast;
    }

    @DynamoDBAttribute(attributeName = "lunch")
    @DynamoDBTyped(DynamoDBMapperFieldModel.DynamoDBAttributeType.M)
    public RecipeDesc getLunch() {
        return lunch;
    }

    @DynamoDBAttribute(attributeName = "dinner")
    @DynamoDBTyped(DynamoDBMapperFieldModel.DynamoDBAttributeType.M)
    public RecipeDesc getDinner() {
        return dinner;
    }

    @DynamoDBAttribute(attributeName = "snack")
    @DynamoDBTyped(DynamoDBMapperFieldModel.DynamoDBAttributeType.M)
    public RecipeDesc getSnack() {
        return snack;
    }

    // Setters
    public void setBreakfast(RecipeDesc breakfast) {
        this.breakfast = breakfast;
    }

    public void setLunch(RecipeDesc lunch) {
        this.lunch = lunch;
    }

    public void setDinner(RecipeDesc dinner) {
        this.dinner = dinner;
    }

    public void setSnack(RecipeDesc snack) {
        this.snack = snack;
    }

}
