package com.fridgetoplate.controller;

import java.util.List;

import com.fridgetoplate.model.RecipeDeleteResponseModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.fridgetoplate.model.Ingredient;
import com.fridgetoplate.model.RecipeModel;
import com.fridgetoplate.repository.RecipeRepository;
import com.fridgetoplate.service.RecipeService;
import com.fridgetoplate.frontendmodels.RecipeFrontendModel;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE })
@RequestMapping("/recipes")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @PostMapping("/create")
    public RecipeFrontendModel save(@RequestBody RecipeFrontendModel recipe){
        // Save the recipe
        return recipeService.save(recipe);
    }

    @GetMapping("/{id}")
    public RecipeFrontendModel findById(@PathVariable(value = "id") String id){
        return recipeService.findById(id);
    }

    @GetMapping("/name/{recipename}")
    public List<RecipeFrontendModel> findRecipesByRecipename(@PathVariable(value = "recipename") String recipename){
        return recipeService.getRecipesByRecipeName(recipename);
    }

    @PutMapping("/update-ratingAndViews/{id}")
    public RecipeFrontendModel updateRatingAndViews(@PathVariable(value = "id") String id, @RequestBody RecipeFrontendModel recipe){
        return recipeService.updateRatingAndViews(recipe);
    }
    
    @PutMapping("/{id}")
    public RecipeFrontendModel update(@PathVariable(value = "id") String id, @RequestBody RecipeFrontendModel recipe){
        return recipeService.update(recipe);
    }

    @DeleteMapping("/{id}")
    public RecipeDeleteResponseModel delete(@PathVariable(value = "id") String id){
        return recipeService.delete(id);
    }
}
