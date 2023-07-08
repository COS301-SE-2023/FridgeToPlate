package com.fridgetoplate.response;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapperFieldModel;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTyped;
import com.fridgetoplate.interfaces.MealPlan;
import com.fridgetoplate.interfaces.RecipeDesc;

public class MealPlanResponse extends MealPlan{
    
  
    private RecipeDesc breakfast;

    private RecipeDesc lunch;

    private RecipeDesc dinner;

    private RecipeDesc snack;

    private RecipeDesc dessert;

    // getters

    @DynamoDBAttribute(attributeName = "username")
    public String getUsername() {
        return username;
    }

    @DynamoDBAttribute(attributeName = "date_Time")
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

    @DynamoDBAttribute(attributeName = "dessert")
    @DynamoDBTyped(DynamoDBMapperFieldModel.DynamoDBAttributeType.M)
    public RecipeDesc getDessert() {
        return dessert;
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

    public void setDessert(RecipeDesc dessert) {
        this.dessert = dessert;
    }

}
