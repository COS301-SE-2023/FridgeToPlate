package com.fridgetoplate.api;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.fridgetoplate.repository.RecipeRepository;
import com.fridgetoplate.model.Recipe;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE })
@RequestMapping("/recipes")
public class RecipeController {

    @Autowired
    private RecipeRepository recipeRepository;

    @PostMapping("/create")
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

    @PutMapping("/{id}")
    public Recipe update(@PathVariable(value = "id") String id, @RequestBody Recipe recipe){
        return recipeRepository.update(id, recipe);
    }


    @DeleteMapping("/{id}")
    public String delete(@PathVariable(value = "id") String id){
        return recipeRepository.delete(id);
    }
}
