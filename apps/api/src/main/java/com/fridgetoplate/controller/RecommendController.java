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
import com.fridgetoplate.service.RecommendService;
import com.fridgetoplate.utils.SpoonacularRecipeConverter;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE })
@RequestMapping("/recommend")

public class RecommendController {

    @Autowired
    private RecommendService recommendService;

    @PostMapping
    public List<RecipeFrontendModel> getRecipeRecommendations(@RequestBody RecommendFrontendModel userRecommendation) {
        try{
            return recommendService.getRecipeRecommendations(userRecommendation);
        }
        catch(Exception error){
            System.out.println(error);
            return new ArrayList<>();
        }
        
    }
    
    @PostMapping("/create")
    public RecommendFrontendModel addRecommendation(@RequestBody RecommendFrontendModel userRecommendation){
        try{
            recommendService.save(userRecommendation);
            return userRecommendation;
        } catch(Exception error){
            System.out.println(error);
            return userRecommendation;
        }
        
    }
    @PutMapping("/{id}")
    public RecommendFrontendModel updatePreferences(@RequestBody RecommendFrontendModel userRecommendation) {
        try{
            recommendService.updateRecommendPreferences(userRecommendation);
            return userRecommendation;
        } catch( Exception error ) {
            System.out.println(error);
            return userRecommendation;
        }
    }

    @GetMapping("/{username}")
    public RecommendFrontendModel getUserRecommendationPreferences(@PathVariable String username){
        try{
            return recommendService.getById(username);
        } catch (Exception error){
            System.out.println(username);
            return new RecommendFrontendModel();
        }
    }
}