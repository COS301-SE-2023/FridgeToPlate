package com.fridgetoplate.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBSaveExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ExpectedAttributeValue;
import com.fridgetoplate.frontendmodels.RecipeFrontendModel;
import com.fridgetoplate.frontendmodels.RecipePreferencesFrontendModel;
import com.fridgetoplate.frontendmodels.RecommendFrontendModel;
import com.fridgetoplate.interfaces.RecipePreferences;
import com.fridgetoplate.model.Ingredient;
import com.fridgetoplate.model.RecommendModel;
import com.fridgetoplate.repository.RecipeRepository;
import com.fridgetoplate.repository.RecommendRepository;
import com.fridgetoplate.utils.SpoonacularRecipeConverter;

@Service
public class RecommendService {

    @Autowired
    private RecommendRepository recommendRepository;

    @Autowired
    private ExternalApiService apiService;

    @Autowired
    private RecipeService recipeService;
    
    public List<RecipeFrontendModel> getRecipeRecommendations(RecommendFrontendModel userRecommendation) {
        if(userRecommendation.getUsername() == null || userRecommendation.getRecipePreferences() == null)
            return new ArrayList<RecipeFrontendModel>();
    
        //0. Store User recommendation object
        this.save(userRecommendation);
        
        RecipePreferencesFrontendModel recipePreferences = userRecommendation.getRecipePreferences();

        List<RecipeFrontendModel> dbQueryResults = recipeService.findAllByPreferences(recipePreferences, userRecommendation.getIngredients());

        if(dbQueryResults.size() < 25){
            SpoonacularRecipeConverter converter = new SpoonacularRecipeConverter();
    
            //1. Query External API and convert to Recipe
            RecipeFrontendModel[] apiQueryResults = converter.unconvert(apiService.spoonacularRecipeSearch(recipePreferences, userRecommendation.getIngredients()).getResults());
            
            //2. Add External API recipes to DB
            if(apiQueryResults.length != 0)
                recipeService.saveBatch( converter.toRecipeModelArray(apiQueryResults) );
            
            //.3 Query Database by prefrence
            dbQueryResults = recipeService.findAllByPreferences(recipePreferences, userRecommendation.getIngredients());

            //Pad results - DEMO.
            dbQueryResults.addAll( Arrays.asList(apiQueryResults) ); 

        }

        return dbQueryResults;
    }

    public RecommendFrontendModel save(RecommendFrontendModel recommendObject){

        RecommendModel model = new RecommendModel();

        model.setUsername(recommendObject.getUsername());

        model.setIngredients(recommendObject.getIngredients());

        RecipePreferences preferences = new RecipePreferences();

        if(recommendObject.getRecipePreferences().getDifficulty() != null && !recommendObject.getRecipePreferences().getDifficulty().isEmpty())
            preferences.setDifficulty(recommendObject.getRecipePreferences().getDifficulty());
            
        if(recommendObject.getRecipePreferences().getMeal() != null && !recommendObject.getRecipePreferences().getMeal().isEmpty())
            preferences.setMeal(recommendObject.getRecipePreferences().getMeal());
        
        if(recommendObject.getRecipePreferences().getPrepTime() != null && !recommendObject.getRecipePreferences().getPrepTime().isEmpty())
            preferences.setPrepTime(recommendObject.getRecipePreferences().getPrepTime());
        
        if(recommendObject.getRecipePreferences().getServings() != null && !recommendObject.getRecipePreferences().getServings().isEmpty())
            preferences.setServings(recommendObject.getRecipePreferences().getServings());
            
        if(recommendObject.getRecipePreferences().getRating() != null && !recommendObject.getRecipePreferences().getRating().isEmpty())        
            preferences.setRating(recommendObject.getRecipePreferences().getRating());
        
        if(recommendObject.getRecipePreferences().getKeywords() != null && recommendObject.getRecipePreferences().getKeywords().length != 0)        
            preferences.setKeywords(Arrays.asList( recommendObject.getRecipePreferences().getKeywords()));

        model.setRecipePreferences(preferences);

        recommendRepository.save(model);        

        return recommendObject;
    }

    public RecommendFrontendModel getById(String username){
        RecommendFrontendModel recommendObject = new RecommendFrontendModel();

        // Find the Recommend model
        RecommendModel recommendModel = recommendRepository.getById(username);

        if(recommendModel == null) {
            RecommendFrontendModel emptyResponse = new RecommendFrontendModel();
            emptyResponse.setUsername(username);
            emptyResponse.setIngredients(new ArrayList<Ingredient>());
            emptyResponse.setPreferences(new RecipePreferencesFrontendModel());
            return emptyResponse;
        }        

        //Convert RecommendModel to Frontend model.
       recommendObject.setUsername(recommendModel.getUsername());
       
       recommendObject.setIngredients(recommendModel.getIngredients());
       
       RecipePreferencesFrontendModel preferencesFrontendObject = new RecipePreferencesFrontendModel();
       
       if(recommendModel.getRecipePreferences().getDifficulty() != null && !recommendModel.getRecipePreferences().getDifficulty().isEmpty())
       preferencesFrontendObject.setDifficulty(recommendModel.getRecipePreferences().getDifficulty());
       
        if(recommendModel.getRecipePreferences().getMeal() != null && !recommendModel.getRecipePreferences().getMeal().isEmpty())
        preferencesFrontendObject.setMeal(recommendModel.getRecipePreferences().getMeal());
        
        if(recommendModel.getRecipePreferences().getPrepTime() != null && !recommendModel.getRecipePreferences().getPrepTime().isEmpty())
        preferencesFrontendObject.setPrepTime(recommendModel.getRecipePreferences().getPrepTime());
        
        if(recommendModel.getRecipePreferences().getServings() != null && !recommendModel.getRecipePreferences().getServings().isEmpty())
        preferencesFrontendObject.setServings(recommendModel.getRecipePreferences().getServings());
            
        if(recommendModel.getRecipePreferences().getRating() != null && !recommendModel.getRecipePreferences().getRating().isEmpty())        
        preferencesFrontendObject.setRating(recommendModel.getRecipePreferences().getRating());
        
        if(recommendModel.getRecipePreferences().getKeywords() != null && recommendModel.getRecipePreferences().getKeywords().size() != 0)        
        preferencesFrontendObject.setKeywords( recommendModel.getRecipePreferences().getKeywords().toArray(new String[recommendModel.getRecipePreferences().getKeywords().size()]) );

       recommendObject.setPreferences(preferencesFrontendObject);

       return recommendObject;
    }

    public RecommendFrontendModel updateRecommendPreferences(RecommendFrontendModel userPreferences){
        RecommendModel updatedRecommend = new RecommendModel();

        updatedRecommend.setUsername(userPreferences.getUsername());

        updatedRecommend.setIngredients(userPreferences.getIngredients());
        
        RecipePreferences preferences = new RecipePreferences();

        RecipePreferencesFrontendModel preferencesFrontendObject = userPreferences.getRecipePreferences();

        if(preferencesFrontendObject.getDifficulty() != null && !preferencesFrontendObject.getDifficulty().isEmpty())
            preferences.setDifficulty(preferencesFrontendObject.getDifficulty());
            
        if(preferencesFrontendObject.getMeal() != null && !preferencesFrontendObject.getMeal().isEmpty())
            preferences.setMeal(preferencesFrontendObject.getMeal());
        
        if(preferencesFrontendObject.getPrepTime() != null && !preferencesFrontendObject.getPrepTime().isEmpty())
            preferences.setPrepTime(preferencesFrontendObject.getPrepTime());
        
        if(preferencesFrontendObject.getServings() != null && !preferencesFrontendObject.getServings().isEmpty())
            preferences.setServings(preferencesFrontendObject.getServings());
            
        if(preferencesFrontendObject.getRating() != null && !preferencesFrontendObject.getRating().isEmpty())        
            preferences.setRating(preferencesFrontendObject.getRating());
        
        if(preferencesFrontendObject.getKeywords() != null && preferencesFrontendObject.getKeywords().length != 0)        
            preferences.setKeywords(Arrays.asList( preferencesFrontendObject.getKeywords()));

        updatedRecommend.setRecipePreferences(preferences);      
        
        recommendRepository.updateRecommendPreferences(updatedRecommend);
        return userPreferences;
    }
}
