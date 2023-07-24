package com.fridgetoplate.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.fridgetoplate.frontendmodels.RecipeFrontendModel;
import com.fridgetoplate.frontendmodels.RecipePreferencesFrontendModel;
import com.fridgetoplate.interfaces.Recipe;
import com.fridgetoplate.repository.RecipeRepository;
import com.fridgetoplate.service.ExternalApiService;
import com.fridgetoplate.utils.RecipeArrayConverter;
import com.fridgetoplate.utils.SpoonacularRecipeConverter;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE })
@RequestMapping("/recommend")

public class RecommendController {
    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private ExternalApiService apiService;

    @GetMapping
    public List<RecipeFrontendModel> findAll() {
        return recipeRepository.findAll();
    }

    @PostMapping
    public List<RecipeFrontendModel> getExternalRecommendation(@RequestBody RecipePreferencesFrontendModel recipePreferences) {

        List<RecipeFrontendModel> dbQueryResults = recipeRepository.findAllByPreferences(recipePreferences);

        if(dbQueryResults.size() < 25){
            SpoonacularRecipeConverter converter = new SpoonacularRecipeConverter();
    
            //1. Query External API and convert to Recipe
            RecipeFrontendModel[] apiQueryResults = converter.unconvert(apiService.spoonacularRecipeSearch(recipePreferences).getResults());
            
            //2. Add External API recipes to DB
            if(apiQueryResults.length != 0)
                recipeRepository.saveBatch( converter.toRecipeModelArray(apiQueryResults) );
            
            //.3 Query Database by prefrence
            dbQueryResults = recipeRepository.findAllByPreferences(recipePreferences);

        }

        return dbQueryResults;
    }
    
}