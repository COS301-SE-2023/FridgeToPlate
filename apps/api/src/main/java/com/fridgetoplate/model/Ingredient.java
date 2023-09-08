package com.fridgetoplate.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBDocument;

import lombok.Data;
@Data
@DynamoDBDocument
public class Ingredient {
    
    protected String name;

    protected Double amount;

    protected String unit;

}
