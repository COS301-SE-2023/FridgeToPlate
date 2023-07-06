package com.fridgetoplate.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
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

    public List<Review> findAll(){
        return dynamoDBMapper.scan(Review.class, new DynamoDBScanExpression());
    }




}
