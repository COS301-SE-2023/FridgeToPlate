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
    
     public List<Review> getReviewsByRecipeId(String id) {
        List<Review> reviews = new ArrayList<>();
        
        PaginatedScanList<Review> scanResult = dynamoDBMapper.scan(Review.class, new DynamoDBScanExpression());

        for (Review review : scanResult) {
            
            if (review.getRecipeId().equals(id)) {
                reviews.add(review);
            }
        }

        return reviews;
    }

    public List<Review> findAll(){
        return dynamoDBMapper.scan(Review.class, new DynamoDBScanExpression());
    }




}
