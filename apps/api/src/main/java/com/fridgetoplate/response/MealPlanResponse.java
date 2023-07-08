package com.fridgetoplate.response;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAutoGeneratedKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapperFieldModel;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTyped;
import com.fridgetoplate.interfaces.MealPlan;
import com.fridgetoplate.interfaces.RecipeDesc;

public class MealPlanResponse extends MealPlan{
    
    @DynamoDBAttribute(attributeName = "breakfast")
    @DynamoDBTyped(DynamoDBMapperFieldModel.DynamoDBAttributeType.M)
    private RecipeDesc breakfast;

    @DynamoDBAttribute(attributeName = "lunch")
    @DynamoDBTyped(DynamoDBMapperFieldModel.DynamoDBAttributeType.M)
    private RecipeDesc lunch;

    @DynamoDBAttribute(attributeName = "dinner")
    @DynamoDBTyped(DynamoDBMapperFieldModel.DynamoDBAttributeType.M)
    private RecipeDesc dinner;

    @DynamoDBAttribute(attributeName = "snack")
    @DynamoDBTyped(DynamoDBMapperFieldModel.DynamoDBAttributeType.M)
    private RecipeDesc snack;

    // getters
    @DynamoDBHashKey(attributeName = "planId")
    @DynamoDBAutoGeneratedKey
    public String getPlanId() {
        return planId;
    }

    @DynamoDBAttribute(attributeName = "username")
    public String getUsername() {
        return username;
    }

    @DynamoDBAttribute(attributeName = "date_Time")
    public String getDateTime() {
        return dateTime;
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
    @DynamoDBAttribute(attributeName = "breakfast")
    @DynamoDBTyped(DynamoDBMapperFieldModel.DynamoDBAttributeType.M)
    public void setBreakfast(RecipeDesc breakfast) {
        this.breakfast = breakfast;
    }

    @DynamoDBAttribute(attributeName = "lunch")
    @DynamoDBTyped(DynamoDBMapperFieldModel.DynamoDBAttributeType.M)
    public void setLunch(RecipeDesc lunch) {
        this.lunch = lunch;
    }

    @DynamoDBAttribute(attributeName = "dinner")
    @DynamoDBTyped(DynamoDBMapperFieldModel.DynamoDBAttributeType.M)
    public void setDinner(RecipeDesc dinner) {
        this.dinner = dinner;
    }

    @DynamoDBAttribute(attributeName = "snack")
    @DynamoDBTyped(DynamoDBMapperFieldModel.DynamoDBAttributeType.M)
    public void setSnack(RecipeDesc snack) {
        this.snack = snack;
    }

}
