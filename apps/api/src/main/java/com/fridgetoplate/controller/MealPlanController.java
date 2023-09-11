package com.fridgetoplate.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;

import com.fridgetoplate.frontendmodels.MealPlanFrontendModel;
import com.fridgetoplate.model.Ingredient;
import com.fridgetoplate.model.MealPlanModel;
import com.fridgetoplate.service.MealPlanService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE })

@RequestMapping("/meal-plans")
public class MealPlanController {

    @Autowired
    private MealPlanService mealPlanService;


    @PostMapping("/save")
    public MealPlanFrontendModel save(@RequestBody MealPlanFrontendModel mealPlan) {
       return this.mealPlanService.save(mealPlan);
    }

    @GetMapping
    public List<MealPlanModel> findAll() {
        return this.mealPlanService.findAll();
    }

    @GetMapping("/{username}/{date}")
    public MealPlanFrontendModel findByUsernameAndDate(@PathVariable(value = "username") String username, @PathVariable(value = "date") String date) {
        return this.mealPlanService.findMealPlan(username, date);
    }

    @GetMapping("/{username}/ingredients")
    public List<Ingredient> getIngredients(@PathVariable(value = "username") String username){
        return this.mealPlanService.findMealPlanIngredients(username);
    }

}