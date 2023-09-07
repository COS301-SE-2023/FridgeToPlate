package com.fridgetoplate.controller;

import java.util.List;
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
    private RecipeRepository recipeRepository;

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

    // @PutMapping("/{id}")
    // public RecipeModel update(@PathVariable(value = "id") String id, @RequestBody RecipeModel recipe){
    //     return recipeService.update(id, recipe);
    // }


    @DeleteMapping("/{id}")
    public String delete(@PathVariable(value = "id") String id){
        return recipeService.delete(id);
    }
}
