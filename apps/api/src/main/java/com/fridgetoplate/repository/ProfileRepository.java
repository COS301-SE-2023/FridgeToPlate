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
import com.fridgetoplate.frontendmodels.MealPlanFrontendModel;
import com.fridgetoplate.frontendmodels.ProfileFrontendModel;
import com.fridgetoplate.interfaces.Profile;
import com.fridgetoplate.interfaces.RecipeDesc;
import com.fridgetoplate.model.MealPlanModel;
import com.fridgetoplate.model.ProfileModel;
import com.fridgetoplate.model.RecipeModel;
import com.fridgetoplate.model.Review;

@Repository
public class ProfileRepository {
    
    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    public ProfileFrontendModel save(ProfileFrontendModel profile){
        ProfileModel model = new ProfileModel();
        model.setUsername(profile.getUsername());
        model.setDisplayName(profile.getDisplayName());
        model.setEmail(profile.getEmail());
        model.setProfilePic(profile.getProfilePic());
        dynamoDBMapper.save(model);
        return profile;
    }

    public ProfileModel findByName(String username) {
        return dynamoDBMapper.load(ProfileModel.class, username);
    }

    public List<ProfileFrontendModel> findAll(){
        return dynamoDBMapper.scan(ProfileFrontendModel.class, new DynamoDBScanExpression());
    }

    public ProfileFrontendModel update(String username, ProfileFrontendModel profile){

        //Retrieve the profile of the specified ID
        ProfileModel profileData = dynamoDBMapper.load(ProfileModel.class, username);

        //Return null if user profile does not exist
        if(profileData == null)
            return null;
        
        if(profile.getDisplayName() != null) {
            profileData.setDisplayName(profile.getDisplayName());
        }

        if(profile.getProfilePic() != null) {
            profileData.setProfilePic(profile.getProfilePic());
        }

        if(profile.getEmail() != null) {
            profileData.setEmail(profile.getEmail());
        }

        if(profile.getSavedRecipes() != null) {
            profileData.setSavedRecipes(this.getSavedRecipeIds(profile.getSavedRecipes()));
        }
        
        dynamoDBMapper.save(profileData,
                new DynamoDBSaveExpression()
        .withExpectedEntry("username",
                new ExpectedAttributeValue(
                        new AttributeValue().withS(username)
                )));

        return profile;
    }

    public String delete(String id){
       Profile profile = dynamoDBMapper.load(Profile.class, id);
        dynamoDBMapper.delete(profile);
        return "Profile deleted successfully: " + id;
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

    private List<String> getSavedRecipeIds(List<RecipeDesc> ids) {
        List<String> savedIds = new ArrayList<>();
        if(ids == null || ids.isEmpty()) {
            return savedIds;
        }

        for (RecipeDesc recipe : ids) {
            savedIds.add(recipe.getRecipeId());
        }
        return savedIds;
    }
}
