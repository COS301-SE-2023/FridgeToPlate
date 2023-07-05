package com.fridgetoplate.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAutoGeneratedKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

@DynamoDBTable(tableName = "reviews")
public class Review {

    @DynamoDBHashKey
    @DynamoDBAutoGeneratedKey
    private String reviewId;

    @DynamoDBAttribute
    private String username;

    @DynamoDBAttribute
    private float rating;

    @DynamoDBAttribute
    private String description;
}
