package com.fridgetoplate.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fridgetoplate.frontendmodels.RecipeFrontendModel;
import com.fridgetoplate.frontendmodels.RecipePreferencesFrontendModel;
import com.fridgetoplate.frontendmodels.RecommendFrontendModel;
import com.fridgetoplate.interfaces.RecipePreferences;
import com.fridgetoplate.model.Ingredient;
import com.fridgetoplate.model.RecommendModel;
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

        if(dbQueryResults.size() < 24) {
            SpoonacularRecipeConverter converter = new SpoonacularRecipeConverter();

            //1. Query External API and convert to Recipe
            RecipeFrontendModel[] apiQueryResults = converter.unconvert(apiService.spoonacularRecipeSearch(recipePreferences, userRecommendation.getIngredients()).getResults());

            //2. Add External API recipes to DB
            if(apiQueryResults.length != 0)
                recipeService.saveBatch( apiQueryResults );
            
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
        
        if(recommendObject.getRecipePreferences().getDifficulty() != null)
        preferences.setDifficulty(recommendObject.getRecipePreferences().getDifficulty());
        
        if(recommendObject.getRecipePreferences().getMeal() != null)
            preferences.setMeal(recommendObject.getRecipePreferences().getMeal());
        
        if(recommendObject.getRecipePreferences().getPrepTime() != null)
            preferences.setPrepTime(recommendObject.getRecipePreferences().getPrepTime());
        
        if(recommendObject.getRecipePreferences().getServings() != null)
            preferences.setServings(recommendObject.getRecipePreferences().getServings());
            
        if(recommendObject.getRecipePreferences().getRating() != null)        
            preferences.setRating(recommendObject.getRecipePreferences().getRating());
        
        if(recommendObject.getRecipePreferences().getKeywords() != null)        
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
            return null;
        }        

        //Convert RecommendModel to Frontend model.
        recommendObject.setUsername(recommendModel.getUsername());
        
        recommendObject.setIngredients(recommendModel.getIngredients());
        
        RecipePreferencesFrontendModel preferencesFrontendObject = new RecipePreferencesFrontendModel();
       
        if(recommendModel.getRecipePreferences().getDifficulty() != null)
            preferencesFrontendObject.setDifficulty(recommendModel.getRecipePreferences().getDifficulty());
        else 
            preferencesFrontendObject.setDifficulty("");
       
        if(recommendModel.getRecipePreferences().getMeal() != null)
            preferencesFrontendObject.setMeal(recommendModel.getRecipePreferences().getMeal());
        else 
            preferencesFrontendObject.setMeal("");
        
        if(recommendModel.getRecipePreferences().getPrepTime() != null)
            preferencesFrontendObject.setPrepTime(recommendModel.getRecipePreferences().getPrepTime());
        else 
            preferencesFrontendObject.setPrepTime("");
        
        if(recommendModel.getRecipePreferences().getServings() != null)
            preferencesFrontendObject.setServings(recommendModel.getRecipePreferences().getServings());
        else 
            preferencesFrontendObject.setServings("");
            
        if(recommendModel.getRecipePreferences().getRating() != null)        
            preferencesFrontendObject.setRating(recommendModel.getRecipePreferences().getRating());
        else 
            preferencesFrontendObject.setRating("");
        
        if(recommendModel.getRecipePreferences().getKeywords() != null)        
            preferencesFrontendObject.setKeywords( recommendModel.getRecipePreferences().getKeywords().toArray(new String[recommendModel.getRecipePreferences().getKeywords().size()]) );
        else 
            preferencesFrontendObject.setKeywords(new String[0]);

       recommendObject.setPreferences(preferencesFrontendObject);

       return recommendObject;
    }

    public RecommendFrontendModel updateRecommendPreferences(RecommendFrontendModel userPreferences){
        RecommendModel updatedRecommend = new RecommendModel();

        updatedRecommend.setUsername(userPreferences.getUsername());

        updatedRecommend.setIngredients(userPreferences.getIngredients());
        
        RecipePreferences preferences = new RecipePreferences();

        RecipePreferencesFrontendModel preferencesFrontendObject = userPreferences.getRecipePreferences();

        if(preferencesFrontendObject.getDifficulty() != null)
            preferences.setDifficulty(preferencesFrontendObject.getDifficulty());
            
        if(preferencesFrontendObject.getMeal() != null)
            preferences.setMeal(preferencesFrontendObject.getMeal());
        
        if(preferencesFrontendObject.getPrepTime() != null)
            preferences.setPrepTime(preferencesFrontendObject.getPrepTime());
        
        if(preferencesFrontendObject.getServings() != null)
            preferences.setServings(preferencesFrontendObject.getServings());
            
        if(preferencesFrontendObject.getRating() != null)        
            preferences.setRating(preferencesFrontendObject.getRating());
        
        if(preferencesFrontendObject.getKeywords() != null)        
            preferences.setKeywords(Arrays.asList( preferencesFrontendObject.getKeywords()));

        updatedRecommend.setRecipePreferences(preferences);      
        
        recommendRepository.updateRecommendPreferences(updatedRecommend);
        return userPreferences;
    }
}
