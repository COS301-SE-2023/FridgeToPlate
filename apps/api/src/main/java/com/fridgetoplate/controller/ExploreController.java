/**
 * This is a Java class that defines the REST API endpoints for managing ingredients in a recipe
 * application.
 */
package com.fridgetoplate.controller;

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

import com.fridgetoplate.frontendmodels.RecipeFrontendModel;
import com.fridgetoplate.interfaces.Explore;
import com.fridgetoplate.interfaces.Recipe;
import com.fridgetoplate.model.Ingredient;
import com.fridgetoplate.model.MealPlanModel;
import com.fridgetoplate.model.ProfileModel;
import com.fridgetoplate.repository.ExploreRepository;
import com.fridgetoplate.repository.IngredientRepository;
import com.fridgetoplate.repository.MealPlanRepository;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE })
@RequestMapping("/explore")

public class ExploreController {
    
    @Autowired
    private ExploreRepository exploreRepository;


    @GetMapping
    public List<RecipeFrontendModel> findAll() {
        return exploreRepository.findAll();
    }

    @PostMapping("/search")
    public List<RecipeFrontendModel> findBySearch(@RequestBody Explore search) {
        return exploreRepository.findBySearch(search);
    }

}
