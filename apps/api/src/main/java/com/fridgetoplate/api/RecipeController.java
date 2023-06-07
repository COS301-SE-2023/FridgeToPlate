package com.fridgetoplate.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fridgetoplate.model.Recipe;
import com.fridgetoplate.repository.RecipeRepository;

@RestController
@RequestMapping("/recipe")
public class RecipeController {

    @Autowired
    private RecipeRepository recipeRepository;

    @PostMapping
    public Recipe save(@RequestBody Recipe recipe){
        return recipeRepository.save(recipe);
    }
    

    @GetMapping("/{id}")
    public Recipe findById(@PathVariable(value = "id") String id){
        return recipeRepository.findById(id);
    }

    @GetMapping
    public List<Recipe> findAll(){
        return recipeRepository.findAll();
    }

    @GetMapping("/testing")
    public String test() {
        return "Tesing: hello world";
    }

    @PutMapping("/{id}")
    public String update(@PathVariable(value = "id") String id,
    @RequestBody Recipe recipe){
        return recipeRepository.update(id, recipe);
    }


    @DeleteMapping("/{id}")
    public String delete(@PathVariable(value = "id") String id){
        return recipeRepository.delete(id);
    }
}