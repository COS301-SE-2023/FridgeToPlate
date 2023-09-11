package com.fridgetoplate.controller;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.fridgetoplate.frontendmodels.RecipeFrontendModel;
import com.fridgetoplate.frontendmodels.RecommendFrontendModel;
import com.fridgetoplate.service.RecommendService;

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
            error.printStackTrace();
            return new ArrayList<>();
        }
    }
    
    @PostMapping("/create")
    public RecommendFrontendModel addRecommendation(@RequestBody RecommendFrontendModel userRecommendation){
        try{
            recommendService.save(userRecommendation);
            return userRecommendation;
        } catch(Exception error){
            error.printStackTrace();
            return userRecommendation;
        }
        
    }
    
    @PutMapping("/{id}")
    public RecommendFrontendModel updatePreferences(@RequestBody RecommendFrontendModel userRecommendation) {
        try{
            recommendService.updateRecommendPreferences(userRecommendation);
            return userRecommendation;
        } catch( Exception error ) {
            error.printStackTrace();
            return userRecommendation;
        }
    }

    @GetMapping("/{username}")
    public RecommendFrontendModel getUserRecommendationPreferences(@PathVariable String username){
        try{
            return recommendService.getById(username);
        } catch (Exception error){
            error.printStackTrace();
            return new RecommendFrontendModel();
        }
    }
}