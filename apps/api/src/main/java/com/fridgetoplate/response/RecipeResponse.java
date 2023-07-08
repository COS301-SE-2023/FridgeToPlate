package com.fridgetoplate.response;

import java.util.List;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapperFieldModel;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTyped;
import com.fridgetoplate.interfaces.Recipe;
import com.fridgetoplate.model.Review;


public class RecipeResponse extends Recipe {

    private List<Review> reviews;
    private Integer views = 0;

    // Getter
    @DynamoDBAttribute(attributeName ="views")
    public List<Review> getReviews() {
        return reviews;
    }

    // Setter
    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    
    @DynamoDBAttribute(attributeName = "views")
    @DynamoDBTyped(DynamoDBMapperFieldModel.DynamoDBAttributeType.N)
    public Integer getViews() {
        return views;
    }

    // The setters

    public void setViews(Integer views) {
        this.views = views;
    }
}
