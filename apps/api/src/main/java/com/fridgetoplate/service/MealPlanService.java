package com.fridgetoplate.service;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fridgetoplate.frontendmodels.MealPlanFrontendModel;
import com.fridgetoplate.interfaces.RecipeDesc;
import com.fridgetoplate.model.MealPlanModel;
import com.fridgetoplate.repository.MealPlanRepository;

@Service
public class MealPlanService {

    @Autowired
    MealPlanRepository mealPlanRepository;
    
    @Autowired
    RecipeService recipeService;

    public MealPlanFrontendModel findMealPlan(String username, String date) {
        /*
          * Getting the MealPan response
          */

        // Find Meal       
        MealPlanModel mealPlanModel = mealPlanRepository.find(username, date);

        if(mealPlanModel != null) {

            // Declare the response object
            MealPlanFrontendModel mealPlanResponse = new MealPlanFrontendModel();

            // creating response
            mealPlanResponse.setUsername(username);

            String breakFastId = mealPlanModel.getBreakfastId();

            RecipeDesc breakfast = null;
            if (breakFastId != null && breakFastId != "") {
                breakfast = recipeService.findById(breakFastId);
            } 

            String lunchId = mealPlanModel.getLunchId();
            RecipeDesc lunch = null;
            if (lunchId != null && lunchId != "") {
                lunch = recipeService.findById(lunchId);
            } 

            String dinnerId = mealPlanModel.getDinnerId();
            RecipeDesc dinner = null;
            if (dinnerId != null && dinnerId != "") {
                dinner = recipeService.findById(dinnerId);
            } 

            String snackId = mealPlanModel.getSnackId();
            RecipeDesc snack = null;
            if (snackId != null && snackId != "") {
                snack = recipeService.findById(snackId);
            } 

            // Creating the mealPlanResponse
            mealPlanResponse.setDate(date);
            mealPlanResponse.setBreakfast(breakfast);
            mealPlanResponse.setLunch(lunch);
            mealPlanResponse.setDinner(dinner);
            mealPlanResponse.setSnack(snack);

            return mealPlanResponse;
        } else {
            return null;
        }
    }
}
