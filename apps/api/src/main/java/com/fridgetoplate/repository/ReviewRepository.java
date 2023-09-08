package com.fridgetoplate.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.PaginatedScanList;
import com.fridgetoplate.model.Review;
import org.springframework.stereotype.Repository;

@Repository
public class ReviewRepository {

    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    public Review save(Review review){
        dynamoDBMapper.save(review);
        return review;
    }

    public List<Review> getReviewsById(String id) {
        List<Review> reviews = new ArrayList<>();

        PaginatedScanList<Review> scanResult = dynamoDBMapper.scan(Review.class, new DynamoDBScanExpression());

        for (Review review : scanResult) {

            if (review.getRecipeId().equals(id)) {
                reviews.add(review);
            }
        }

        return reviews;
    }

    public List<Review> getReviewsByUsername(String username) {
        List<Review> reviews = new ArrayList<>();

        PaginatedScanList<Review> scanResult = dynamoDBMapper.scan(Review.class, new DynamoDBScanExpression());

        for (Review review : scanResult) {

            if (review.getUsername().equals(username)) {
                reviews.add(review);
            }
        }

        return reviews;
    }

    public Review getReviewByReviewId(String recipeId, String reviewId) {
        return dynamoDBMapper.load(Review.class, recipeId, reviewId);
    }

    public List<Review> findAll(){
        return dynamoDBMapper.scan(Review.class, new DynamoDBScanExpression());
    }

    public String delete(String recipeId, String reviewId){
       Review review = dynamoDBMapper.load(Review.class, recipeId, reviewId);
        dynamoDBMapper.delete(review);
        return "Recipe deleted successfully:: " + recipeId + reviewId;
    }
}
