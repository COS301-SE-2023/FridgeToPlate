package com.fridgetoplate.repository;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBSaveExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ExpectedAttributeValue;
import com.fridgetoplate.interfaces.Profile;
import com.fridgetoplate.interfaces.RecipeDesc;
import com.fridgetoplate.model.MealPlanModel;
import com.fridgetoplate.model.ProfileModel;
import com.fridgetoplate.model.RecipeModel;
import com.fridgetoplate.response.ProfileResponse;

@Repository
public class ProfileRepository {
    
    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    public ProfileModel save(ProfileModel profile){
        dynamoDBMapper.save(profile);
        return profile;
    }

    public ProfileResponse findById(String id){
        

        
        // Find the model
        ProfileModel profileModel = dynamoDBMapper.load(ProfileModel.class, id);

        // Find Meal
        MealPlanModel mealPlanModel = dynamoDBMapper.load(MealPlanModel.class, profileModel.getUsername());
        
        

        // Find Saved Recipes
        RecipeDesc recipe = dynamoDBMapper.load(RecipeModel.class, id);


       return null;
    }

    public List<ProfileModel> findAll(){
        return dynamoDBMapper.scan(ProfileModel.class, new DynamoDBScanExpression());
    }

    public Profile update(String id, Profile profile){

        //Retrieve the profile of the specified ID
        Profile profileData =  dynamoDBMapper.load(Profile.class, id);

        System.out.println("profileData");
        System.out.println(profileData);

        //Return null if user profile does not exist
        if(profileData == null)
            return null;
        
        dynamoDBMapper.save(profileData,
                new DynamoDBSaveExpression()
        .withExpectedEntry("profileId",
                new ExpectedAttributeValue(
                        new AttributeValue().withS(id)
                )));
        return profileData;
    }

    public String delete(String id){
       Profile profile = dynamoDBMapper.load(Profile.class, id);
        dynamoDBMapper.delete(profile);
        return "Profile deleted successfully:: " + id;
    }

    
}
