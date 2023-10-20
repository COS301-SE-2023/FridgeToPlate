package com.fridgetoplate.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.fridgetoplate.model.Review;

import graphql.com.google.common.collect.ImmutableMap;

import org.springframework.stereotype.Repository;

@Repository
public class ReviewRepository {

    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    public Review save(Review review){
        dynamoDBMapper.save(review);
        return review;
    }

    public List<Review> getReviewsById(String recipeId) {
        DynamoDBQueryExpression<Review> query = new DynamoDBQueryExpression<Review>();
            query.setKeyConditionExpression("recipeId = :id");
            query.withExpressionAttributeValues(ImmutableMap.of(":id", new AttributeValue().withS(recipeId)));

        return dynamoDBMapper.query(Review.class, query);
    }

    public Review getReviewByReviewId(String recipeId, String reviewId) {
        return dynamoDBMapper.load(Review.class, recipeId, reviewId);
    }

    public String delete(String recipeId, String reviewId){
       Review review = dynamoDBMapper.load(Review.class, recipeId, reviewId);
        dynamoDBMapper.delete(review);
        return "SUCCESSFULLY DELETED";
    }

    public String removeReviews(List<Review> reviews) {
        dynamoDBMapper.batchDelete(reviews);
        return "SUCCESSFULLY DELETED";
    }
}
