package com.fridgetoplate.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.fridgetoplate.model.RecipeModel;
import com.fridgetoplate.repository.RecipeRepository;
import com.fridgetoplate.frontendmodels.RecipeFrontendModel;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE })
@RequestMapping("/recipes")
public class RecipeController {

    @Autowired
    private RecipeRepository recipeRepository;

    @PostMapping("/create")
    public RecipeFrontendModel save(@RequestBody RecipeFrontendModel recipe){
        // Save the recipe
        return recipeRepository.save(recipe);
    }

    @GetMapping("/{id}")
    public RecipeFrontendModel findById(@PathVariable(value = "id") String id){
        return recipeRepository.findById(id);
    }

    @GetMapping("/creator/{username}")
    public List<RecipeFrontendModel> findRecipesByUsername(@PathVariable(value = "username") String username){
        return recipeRepository.getRecipesByUsername(username);
    }

    @GetMapping
    public List<RecipeFrontendModel> findAll(){
        return recipeRepository.findAll();
    }

    @PutMapping("/{id}")
    public RecipeModel update(@PathVariable(value = "id") String id, @RequestBody RecipeModel recipe){
        return recipeRepository.update(id, recipe);
    }


    @DeleteMapping("/{id}")
    public String delete(@PathVariable(value = "id") String id){
        return recipeRepository.delete(id);
    }
}
