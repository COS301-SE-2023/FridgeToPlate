package com.fridgetoplate.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.fridgetoplate.frontendmodels.MealPlanFrontendModel;
import com.fridgetoplate.interfaces.RecipeDesc;
import com.fridgetoplate.model.MealPlanModel;
import com.fridgetoplate.model.RecipeModel;

@Repository
public class MealPlanRepository {

    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    public MealPlanFrontendModel save(MealPlanModel mealPlan) {

        RecipeDesc recipe = null;
        dynamoDBMapper.save(mealPlan);
        MealPlanFrontendModel model = new MealPlanFrontendModel();
        if(mealPlan.getBreakfastId() != null && !mealPlan.getBreakfastId().isEmpty()) {
            String id = mealPlan.getBreakfastId();
            recipe = dynamoDBMapper.load(RecipeModel.class, id);
            model.setBreakfast(recipe);
        }
        else {
            model.setBreakfast(null);
        }

        if(mealPlan.getLunchId() != null && !mealPlan.getLunchId().isEmpty()) {
            String id = mealPlan.getLunchId();
            recipe = dynamoDBMapper.load(RecipeModel.class,id);
            model.setLunch(recipe);
        }
        else {
            model.setLunch(null);
        }

        if(mealPlan.getDinnerId() != null && !mealPlan.getDinnerId().isEmpty()) {
            String id = mealPlan.getDinnerId();
            recipe = dynamoDBMapper.load(RecipeModel.class,id);
            model.setDinner(recipe);
        }
        else {
            model.setDinner(null);
        }

        if(mealPlan.getSnackId() != null && !mealPlan.getSnackId().isEmpty()) {
            String id = mealPlan.getSnackId();
            recipe = dynamoDBMapper.load(RecipeModel.class, id);
            model.setSnack(recipe);
        }
        else {
            model.setSnack(null);
        }
        
        model.setUsername(mealPlan.getUsername());
        model.setDate(mealPlan.getDate());

        return model;
    }

    public MealPlanModel find(String username, String date) {
        return dynamoDBMapper.load(MealPlanModel.class, username, date);
    }

    public void setDynamoDBMapper(DynamoDBMapper dynamoDBMapper) {
        this.dynamoDBMapper = dynamoDBMapper;
    }
}