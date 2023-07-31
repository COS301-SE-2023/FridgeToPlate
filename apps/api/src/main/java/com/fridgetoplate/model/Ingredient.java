package com.fridgetoplate.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBDocument;

import lombok.Data;

@Data
@DynamoDBDocument
public class Ingredient {
    
    private String name;

    private Integer amount;

    private String unit;

}
