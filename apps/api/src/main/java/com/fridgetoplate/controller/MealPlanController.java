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

import com.fridgetoplate.frontendmodels.MealPlanFrontendModel;
import com.fridgetoplate.model.MealPlanModel;
import com.fridgetoplate.repository.MealPlanRepository;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE })

@RequestMapping("/meal-plans")
public class MealPlanController {

    @Autowired
    private MealPlanRepository mealPlanRepository;

    @PostMapping("/save")
    public MealPlanFrontendModel save(@RequestBody MealPlanFrontendModel mealPlan) {

        MealPlanModel plan = new MealPlanModel();

       

        if(mealPlan.getBreakfast() != null) {
            plan.setBreakfastId(mealPlan.getBreakfast().getRecipeId());
        }
        else {
            plan.setBreakfastId("");
        }
        if(mealPlan.getLunch() != null) {
            plan.setLunchId(mealPlan.getLunch().getRecipeId());
        }
        else {
            plan.setLunchId("");    
        }

        if(mealPlan.getDinner() != null) {
            plan.setDinnerId(mealPlan.getDinner().getRecipeId());
        }
        else {
            plan.setDinnerId("");
        }
        if(mealPlan.getSnack() != null) {
            plan.setSnackId(mealPlan.getSnack().getRecipeId());
        }
        else {
            plan.setSnackId("");
        }
        
        plan.setUsername(mealPlan.getUsername());
        plan.setDate(mealPlan.getDate());
        return mealPlanRepository.save(plan);
    }

    @GetMapping
    public List<MealPlanModel> findAll() {
        return mealPlanRepository.findAll();
    }

    @GetMapping("/{username}")
    public MealPlanModel findByUsername(@PathVariable(value = "username") String username) {
        return mealPlanRepository.findByUsername(username);
    }

}