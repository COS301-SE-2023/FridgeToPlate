package com.fridgetoplate.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBRangeKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import com.fridgetoplate.interfaces.MealPlan;

@DynamoDBTable(tableName = "meal_plans")
public class MealPlanModel extends MealPlan {

    private String breakfastId;

    private String lunchId;
    
    private String dinnerId;

    private String snackId;

    // Getters

    @DynamoDBHashKey(attributeName = "username")
    public String getUsername() {
        return username;
    }

    @DynamoDBRangeKey(attributeName = "date")
    public String getDate() {
        return date;
    }

    @DynamoDBAttribute(attributeName = "breakfast")
    public String getBreakfastId() {
        return breakfastId;
    }

    @DynamoDBAttribute(attributeName = "lunch")
    public String getLunchId() {
        return lunchId;
    }

    @DynamoDBAttribute(attributeName = "dinner")
    public String getDinnerId() {
        return dinnerId;
    }

    @DynamoDBAttribute(attributeName = "snack")
    public String getSnackId() {
        return snackId;
    }

    // setters
    @DynamoDBAttribute(attributeName = "breakfast")
    public void setBreakfastId(String breakfastId) {
        this.breakfastId = breakfastId;
    }

    @DynamoDBAttribute(attributeName = "lunch")
    public void setLunchId(String lunchId) {
        this.lunchId = lunchId;
    }

    @DynamoDBAttribute(attributeName = "dinner")
    public void setDinnerId(String dinnerId) {
        this.dinnerId = dinnerId;
    }

    @DynamoDBAttribute(attributeName = "snack")
    public void setSnackId(String snackId) {
        this.snackId = snackId;
    }


}
