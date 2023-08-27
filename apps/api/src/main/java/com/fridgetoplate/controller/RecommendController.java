package com.fridgetoplate.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.fridgetoplate.frontendmodels.RecipeFrontendModel;
import com.fridgetoplate.frontendmodels.RecipePreferencesFrontendModel;
import com.fridgetoplate.frontendmodels.RecommendFrontendModel;
import com.fridgetoplate.repository.RecipeRepository;
import com.fridgetoplate.repository.RecommendRepository;
import com.fridgetoplate.service.ExternalApiService;
import com.fridgetoplate.utils.SpoonacularRecipeConverter;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE })
@RequestMapping("/recommend")

public class RecommendController {
    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private RecommendRepository recommendRepository;

    @Autowired
    private ExternalApiService apiService;

    @PostMapping
    public List<RecipeFrontendModel> getExternalRecommendation(@RequestBody RecommendFrontendModel userRecommendation) {

        try{
            if(userRecommendation.getUsername() == null || userRecommendation.getRecipePreferences() == null)
                return new ArrayList<RecipeFrontendModel>();
    
            //0. Store User recommendation object
            recommendRepository.save(userRecommendation);
            
            RecipePreferencesFrontendModel recipePreferences = userRecommendation.getRecipePreferences();
    
            List<RecipeFrontendModel> dbQueryResults = recipeRepository.findAllByPreferences(recipePreferences, userRecommendation.getIngredients());
    
            if(dbQueryResults.size() < 25){
                SpoonacularRecipeConverter converter = new SpoonacularRecipeConverter();
        
                //1. Query External API and convert to Recipe
                RecipeFrontendModel[] apiQueryResults = converter.unconvert(apiService.spoonacularRecipeSearch(recipePreferences, userRecommendation.getIngredients()).getResults());
                
                //2. Add External API recipes to DB
                if(apiQueryResults.length != 0)
                    recipeRepository.saveBatch( converter.toRecipeModelArray(apiQueryResults) );
                
                //.3 Query Database by prefrence
                dbQueryResults = recipeRepository.findAllByPreferences(recipePreferences, userRecommendation.getIngredients());
    
                //Pad results - DEMO.
                dbQueryResults.addAll( Arrays.asList(apiQueryResults) ); 
    
            }
    
            return dbQueryResults;
        }
        catch(Exception error){
            System.out.println(error);
            return new ArrayList<>();
        }
        
    }
    
    @PostMapping("/create")
    public RecommendFrontendModel addRecommendation(@RequestBody RecommendFrontendModel userRecommendation){
        try{
            recommendRepository.save(userRecommendation);
            return userRecommendation;
        } catch(Exception error){
            System.out.println(error);
            return userRecommendation;
        }
        
    }
    @PutMapping("/{id}")
    public RecommendFrontendModel updatePreferences(@RequestBody RecommendFrontendModel userRecommendation) {
        try{
            recommendRepository.updateRecommendPreferences(userRecommendation);
            return userRecommendation;
        } catch( Exception error ) {
            System.out.println(error);
            return userRecommendation;
        }
    }

    @GetMapping("/{username}")
    public RecommendFrontendModel getUserRecommendationPreferences(@PathVariable String username){
        try{
            return recommendRepository.getById(username);
        } catch (Exception error){
            System.out.println(username);
            return new RecommendFrontendModel();
        }
    }
}