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

    @DynamoDBAttribute(attributeName = "breakfast_id")
    public String getBreakfastId() {
        return breakfastId;
    }

    @DynamoDBAttribute(attributeName = "lunch_id")
    public String getLunchId() {
        return lunchId;
    }

    @DynamoDBAttribute(attributeName = "dinner_id")
    public String getDinnerId() {
        return dinnerId;
    }

    @DynamoDBAttribute(attributeName = "snack_id")
    public String getSnackId() {
        return snackId;
    }

    // setters
    @DynamoDBAttribute(attributeName = "breakfast_id")
    public void setBreakfastId(String breakfastId) {
        this.breakfastId = breakfastId;
    }

    public void setLunchId(String lunchId) {
        this.lunchId = lunchId;
    }

    public void setDinnerId(String dinnerId) {
        this.dinnerId  = dinnerId;
    }
    
    public void setSnackId(String snackId) {
        this.snackId = snackId;
    }


}
