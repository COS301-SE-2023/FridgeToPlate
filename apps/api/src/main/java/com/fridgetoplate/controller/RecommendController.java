package com.fridgetoplate.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.fridgetoplate.frontendmodels.RecipeFrontendModel;
import com.fridgetoplate.frontendmodels.RecipePreferencesFrontendModel;
import com.fridgetoplate.interfaces.Recipe;
import com.fridgetoplate.repository.RecipeRepository;
import com.fridgetoplate.service.ExternalApiService;
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
        SpoonacularRecipeConverter converter = new SpoonacularRecipeConverter();
        
        Recipe[] recipeList = converter.unconvert(apiService.spoonacularRecipeSearch(recipePreferences).getResults());
        
        return recipeRepository.findAll();
    }
    
}