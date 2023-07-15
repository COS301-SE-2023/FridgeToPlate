package com.fridgetoplate.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.fridgetoplate.interfaces.Recipe;
import com.fridgetoplate.model.Ingredient;
import com.fridgetoplate.model.RecipeModel;
import com.fridgetoplate.repository.IngredientRepository;
import com.fridgetoplate.repository.RecipeRepository;
import com.fridgetoplate.response.RecipeResponse;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE })
@RequestMapping("/recipes")
public class RecipeController {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private IngredientRepository ingredientRepository;

    @PostMapping("/create")
    public RecipeModel save(@RequestBody RecipeModel recipe){

        // FIrst store the ingredients
        List<Ingredient> ingredients = recipe.getIngredients();
        for (Ingredient ingredient : ingredients) {
            ingredientRepository.save(ingredient);
        }
        
        return recipeRepository.save(recipe);
    }


    @GetMapping("/{id}")
    public Recipe findById(@PathVariable(value = "id") String id){
        return recipeRepository.findById(id);
    }

    @GetMapping("/creator/{username}")
    public List<RecipeResponse> findRecipesByUsername(@PathVariable(value = "username") String username){
        return recipeRepository.getRecipesByUsername(username);
    }

    @GetMapping
    public List<RecipeResponse> findAll(){
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
