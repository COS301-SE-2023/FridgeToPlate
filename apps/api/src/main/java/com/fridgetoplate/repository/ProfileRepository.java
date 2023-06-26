package com.fridgetoplate.repository;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBSaveExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ExpectedAttributeValue;
import com.fridgetoplate.model.Profile;

@Repository
public class ProfileRepository {
    
    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    public Profile save(Profile profile){
        dynamoDBMapper.save(profile);
        return profile;
    }

    public Profile findById(String id){
       return dynamoDBMapper.load(Profile.class, id);
    }

    public List<Profile> findAll(){
        return dynamoDBMapper.scan(Profile.class, new DynamoDBScanExpression());
    }

    public Profile update(String id, Profile profile){

        //Retrieve the profile of the specified ID
        Profile profileData =  dynamoDBMapper.load(Profile.class, id);

        System.out.println("profileData");
        System.out.println(profileData);

        //Return null if user profile does not exist
        if(profileData == null)
            return null;


        //Set the new details of the user profile
        if(profile.getIngredients() != null) {
            profileData.setIngredients(profile.getIngredients());
        }

        if(profile.getPreferences() != null) {
            profileData.setPreferences(profile.getPreferences());
        }

        if(profile.getCreatedRecipes() != null) {
            profile.setCreatedRecipes(profile.getCreatedRecipes());
        }

        if(profile.getProfilePicture() != null) {
            profileData.setProfilePicture(profile.getProfilePicture());
        }

        if(profile.getUsername() != null) {
            profileData.setUsername(profile.getUsername());
        }

        if(profile.getEmail() != null) {
            profileData.setEmail(profile.getEmail());
        }

        if(profile.getDisplayName() != null) {
            profileData.setDisplayName(profile.getDisplayName());
        }
        
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
