package com.fridgetoplate.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import com.fridgetoplate.interfaces.Recipe;

@DynamoDBTable(tableName = "recipes")
public class RecipeModel extends Recipe {
    
    @DynamoDBAttribute
    public Integer views;
}
