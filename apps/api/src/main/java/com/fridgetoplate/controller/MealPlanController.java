package com.fridgetoplate.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;

import com.fridgetoplate.model.MealPlanModel;
import com.fridgetoplate.repository.MealPlanRepository;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE })

@RequestMapping("/meal-plans")
public class MealPlanController {

    @Autowired
    private MealPlanRepository mealPlanRepository;

    @PostMapping("/save")
    public MealPlanModel save(@RequestBody MealPlanModel mealPlan) {
        return mealPlanRepository.save(mealPlan);
    }

    @GetMapping
    public List<MealPlanModel> findAll() {
        return mealPlanRepository.findAll();
    }

    @PutMapping("/{username}")
    public MealPlanModel removeRecipe(@PathVariable(value = "username") String username, @RequestBody String recipeId) {
        return mealPlanRepository.remove(username, recipeId);
    }

    @GetMapping("/{username}")
    public MealPlanModel findByUsername(@PathVariable(value = "username") String username) {
        return mealPlanRepository.findByUsername(username);
    }

}