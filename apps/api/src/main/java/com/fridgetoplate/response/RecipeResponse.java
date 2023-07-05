package com.fridgetoplate.response;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverted;
import com.fridgetoplate.interfaces.Recipe;
import com.fridgetoplate.model.Review;
import com.fridgetoplate.utils.ReviewArrayConverter;


public class RecipeResponse extends Recipe {
    
    @DynamoDBAttribute
     @DynamoDBTypeConverted(converter = ReviewArrayConverter.class)
    public Review[] views;
}
