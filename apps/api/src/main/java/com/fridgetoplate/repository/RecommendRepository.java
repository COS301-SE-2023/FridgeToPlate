package com.fridgetoplate.repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBSaveExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.PaginatedScanList;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ExpectedAttributeValue;
import com.fridgetoplate.frontendmodels.RecipePreferencesFrontendModel;
import com.fridgetoplate.frontendmodels.RecommendFrontendModel;
import com.fridgetoplate.model.Ingredient;
import com.fridgetoplate.model.RecipePreferences;
import com.fridgetoplate.model.RecommendModel;

public class RecommendRepository {
    @Autowired
    private DynamoDBMapper dynamoDBMapper;
    
    public RecommendFrontendModel save(RecommendFrontendModel recommendObject){

        RecommendModel model = new RecommendModel();

        model.setUsername(recommendObject.getUsername());

        model.setIngredients(recommendObject.getIngredients());

        RecipePreferences preferences = new RecipePreferences();

        preferences.setDifficulty(recommendObject.getRecipePreferences().getDifficulty());
        preferences.setMeal(recommendObject.getRecipePreferences().getMeal());
        preferences.setPrepTime(recommendObject.getRecipePreferences().getPrepTime());
        preferences.setServings(recommendObject.getRecipePreferences().getServings());
        preferences.setRating(recommendObject.getRecipePreferences().getRating());
        preferences.setKeywords(Arrays.asList( recommendObject.getRecipePreferences().getKeywords()));

        dynamoDBMapper.save(preferences);        

        return recommendObject;
    }

    public RecommendFrontendModel getById(String username){
        RecommendFrontendModel recommendObject = new RecommendFrontendModel();

        // Find the Recommend model
        RecommendModel recommendModel = dynamoDBMapper.load(RecommendModel.class, username);

        if(recommendModel == null) {
            return null;
        }        

        //Convert RecommendModel to Frontend model.
       recommendObject.setUsername(recommendModel.getUsername());
       
       recommendObject.setIngredients(recommendModel.getIngredients());
       
       RecipePreferencesFrontendModel preferencesFrontendObject = new RecipePreferencesFrontendModel();

       RecipePreferences preferences = recommendModel.getRecipePreferences();
       
       preferences.setDifficulty(preferencesFrontendObject.getDifficulty());
       preferences.setMeal(preferencesFrontendObject.getMeal());
       preferences.setServings(preferences.getServings());
       preferences.setRating(preferencesFrontendObject.getRating());
       preferences.setPrepTime(preferencesFrontendObject.getPrepTime());
       preferences.setKeywords(Arrays.asList( preferencesFrontendObject.getKeywords() ) );

       recommendObject.setPreferences(preferencesFrontendObject);

       return recommendObject;
    }

    public RecommendFrontendModel updateRecommendPreferences(RecommendFrontendModel userPreferences){
        RecommendModel updatedRecommend = new RecommendModel();

        updatedRecommend.setUsername(userPreferences.getUsername());

        updatedRecommend.setIngredients(userPreferences.getIngredients());
        
        RecipePreferences preferences = new RecipePreferences();

        RecipePreferencesFrontendModel preferencesFrontendObject = userPreferences.getRecipePreferences();

        preferences.setDifficulty(preferencesFrontendObject.getDifficulty());
        preferences.setMeal(preferencesFrontendObject.getMeal());
        preferences.setServings(preferences.getServings());
        preferences.setRating(preferencesFrontendObject.getRating());
        preferences.setPrepTime(preferencesFrontendObject.getPrepTime());
        preferences.setKeywords(Arrays.asList( preferencesFrontendObject.getKeywords() ) );
 
        updatedRecommend.setRecipePreferences(preferences);      
        
        dynamoDBMapper.save(updatedRecommend, new DynamoDBSaveExpression().withExpectedEntry("username",
                new ExpectedAttributeValue(
                        new AttributeValue().withS(userPreferences.getUsername())
                )) );
        return userPreferences;
    }

    // public List<RecommendFrontendModel> getAllUserRecommendations(String username){
    //     List<RecommendFrontendModel> userRecommendations =new ArrayList<>();
        
    //     HashMap<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        
    //     eav.put(":username", new AttributeValue().withS(username));

    //     //Filter Expression
    //     DynamoDBScanExpression scanExpression = new DynamoDBScanExpression().withFilterExpression("username=:username").withExpressionAttributeValues(eav);

    //     PaginatedScanList<RecommendModel> scanResult = dynamoDBMapper.scan(RecommendModel.class, scanExpression);

    //     for (RecommendModel recommendModel : scanResult) {
            
    //     RecommendFrontendModel recommendObject = new RecommendFrontendModel();        
        
    //     //Convert RecommendModel to Frontend model.
    //     recommendObject.setUsername(recommendModel.getUsername());

    //     recommendObject.setIngredients(recommendModel.getIngredients());
        
    //     RecipePreferencesFrontendModel preferencesFrontendObject = new RecipePreferencesFrontendModel();
 
    //     RecipePreferences currentPreferences = recommendModel.getRecipePreferences();
        
    //     preferencesFrontendObject.setDifficulty(currentPreferences.getDifficulty());
    //     preferencesFrontendObject.setMeal(currentPreferences.getMeal());
    //     preferencesFrontendObject.setServings(currentPreferences.getServings());
    //     preferencesFrontendObject.setRating(currentPreferences.getRating());
    //     preferencesFrontendObject.setPrepTime(currentPreferences.getPrepTime());
    //     preferencesFrontendObject.setKeywords(currentPreferences.getKeywords().toArray(new String[currentPreferences.getKeywords().size()]));
 
    //     recommendObject.setPreferences(preferencesFrontendObject);
 
    //     userRecommendations.add(recommendObject);

    //     }

    //     return userRecommendations;
    // }

}
