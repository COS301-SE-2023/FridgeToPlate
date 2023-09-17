package com.fridgetoplate.repository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBSaveExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.PaginatedScanList;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ExpectedAttributeValue;
import com.fridgetoplate.frontendmodels.ProfileFrontendModel;
import com.fridgetoplate.interfaces.Profile;
import com.fridgetoplate.interfaces.RecipeDesc;
import com.fridgetoplate.model.ProfileModel;
import com.fridgetoplate.model.Review;

@Repository
public class ProfileRepository {
    
    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    public void save(ProfileModel profile){
        dynamoDBMapper.save(profile);
    }

    public ProfileModel findByName(String username) {
        return dynamoDBMapper.load(ProfileModel.class, username);
    }

    public List<ProfileModel> findAllUsers(){
        return dynamoDBMapper.scan(ProfileModel.class, new DynamoDBScanExpression());
    }

    public void update(String username, ProfileModel profile){
        dynamoDBMapper.save(profile,
                new DynamoDBSaveExpression()
        .withExpectedEntry("username",
                new ExpectedAttributeValue(
                        new AttributeValue().withS(username)
                )));
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
}
