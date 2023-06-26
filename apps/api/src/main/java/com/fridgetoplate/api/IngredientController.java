/**
 * This is a Java class that defines the REST API endpoints for managing ingredients in a recipe
 * application.
 */
package com.fridgetoplate.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fridgetoplate.model.Ingredient;
import com.fridgetoplate.repository.IngredientRepository;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE })
@RequestMapping("/ingredients")
public class IngredientController {
    @Autowired
    private IngredientRepository ingredientRepository;

    @PostMapping("/create")
    public Ingredient save(@RequestBody Ingredient ingredient){
        return ingredientRepository.save(ingredient);
    }


    @GetMapping("/{id}")
    public Ingredient findById(@PathVariable(value = "id") String id){
        return ingredientRepository.findById(id);
    }

    @GetMapping
    public List<Ingredient> findAll(){
        return ingredientRepository.findAll();
    }

    @GetMapping("/testing")
    public String testing() {
        return "Testing purposes";
    }

    @PutMapping("/{id}")
    public Ingredient update(@PathVariable(value = "id") String id, @RequestBody Ingredient ingredient){
        return ingredientRepository.update(id, ingredient);
    }


    @DeleteMapping("/{id}")
    public String delete(@PathVariable(value = "id") String id){
        return ingredientRepository.delete(id);
    }
}
