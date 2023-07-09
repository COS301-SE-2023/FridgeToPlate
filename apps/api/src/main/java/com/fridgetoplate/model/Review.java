package com.fridgetoplate.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAutoGeneratedKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBRangeKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

import lombok.Data;
@Data
@DynamoDBTable(tableName = "reviews")
public class Review {

    @DynamoDBHashKey(attributeName = "recipeId")
    private String recipeId;

    @DynamoDBRangeKey(attributeName = "reviewId")
    @DynamoDBAutoGeneratedKey
    private String reviewId;

    @DynamoDBAttribute(attributeName = "username")
    private String username;

    @DynamoDBAttribute(attributeName = "rating")
    private float rating;

    @DynamoDBAttribute(attributeName = "description")
    private String description;
}