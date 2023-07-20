package com.fridgetoplate.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.fridgetoplate.frontendmodels.RecipeFrontendModel;
import com.fridgetoplate.repository.RecipeRepository;
import com.fridgetoplate.service.ExternalApiService;

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
    public List<RecipeFrontendModel> getExternalRecommendation() {
        apiService.spoonacularRecipeSearch();
        return recipeRepository.findAll();
    }

    
}