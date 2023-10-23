package com.fridgetoplate.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fridgetoplate.frontendmodels.MealPlanFrontendModel;
import com.fridgetoplate.interfaces.RecipeDesc;
import com.fridgetoplate.model.Ingredient;
import com.fridgetoplate.model.IngredientModel;
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

        // Declare the response object
        MealPlanFrontendModel mealPlanResponse = new MealPlanFrontendModel();

        // creating response
        mealPlanResponse.setUsername(username);
        mealPlanResponse.setDate(date);

        if(mealPlanModel != null) {

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
            mealPlanResponse.setBreakfast(breakfast);
            mealPlanResponse.setLunch(lunch);
            mealPlanResponse.setDinner(dinner);
            mealPlanResponse.setSnack(snack);
        } 
        
        return mealPlanResponse;
    }

     public List<Ingredient> findMealPlanIngredients(MealPlanFrontendModel mealPlan) {
        List<Ingredient> formattedList = new ArrayList<>();

        if(mealPlan == null){
            return formattedList;
        }
        
        if(mealPlan.getBreakfast() != null) {
            List<IngredientModel> unformattedList = this.recipeService.findIngredientsByRecipeId(mealPlan.getBreakfast().getRecipeId());
            for(IngredientModel model : unformattedList) {
                if(!formattedList.contains(model)) {
                    Ingredient ingredient = new Ingredient();
                    ingredient.setName(model.getName());
                    ingredient.setAmount(model.getAmount());
                    ingredient.setUnit(model.getUnit());
                    formattedList.add(ingredient);
                }
            }
        }

        if(mealPlan.getLunch() != null) {
            List<IngredientModel> unformattedList = this.recipeService.findIngredientsByRecipeId(mealPlan.getLunch().getRecipeId());
            for(IngredientModel model : unformattedList) {
                if(!formattedList.contains(model)) {
                    Ingredient ingredient = new Ingredient();
                    ingredient.setName(model.getName());
                    ingredient.setAmount(model.getAmount());
                    ingredient.setUnit(model.getUnit());
                    formattedList.add(ingredient);
                }
            }
        }

         if(mealPlan.getDinner() != null) {
            List<IngredientModel> unformattedList = this.recipeService.findIngredientsByRecipeId(mealPlan.getDinner().getRecipeId());
            for(IngredientModel model : unformattedList) {
                if(!formattedList.contains(model)) {
                    Ingredient ingredient = new Ingredient();
                    ingredient.setName(model.getName());
                    ingredient.setAmount(model.getAmount());
                    ingredient.setUnit(model.getUnit());
                    formattedList.add(ingredient);
                }
            }
        }

         if(mealPlan.getSnack() != null) {
            List<IngredientModel> unformattedList = this.recipeService.findIngredientsByRecipeId(mealPlan.getSnack().getRecipeId());
            for(IngredientModel model : unformattedList) {
                if(!formattedList.contains(model)) {
                    Ingredient ingredient = new Ingredient();
                    ingredient.setName(model.getName());
                    ingredient.setAmount(model.getAmount());
                    ingredient.setUnit(model.getUnit());
                    formattedList.add(ingredient);
                }
            }
        }

        return formattedList;
    }

    public MealPlanFrontendModel save(MealPlanFrontendModel mealPlan){
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
        mealPlanRepository.save(plan);
        return mealPlan;
    }
}
