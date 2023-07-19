package com.fridgetoplate.repository;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.PaginatedScanList;
import com.fridgetoplate.model.MealPlanModel;

@Repository
public class MealPlanRepository {

    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    public MealPlanModel save(MealPlanModel mealPlan) {
        // 
        dynamoDBMapper.save(mealPlan);
        return mealPlan;
    }

    public List<MealPlanModel> findAll() {
        return dynamoDBMapper.scan(MealPlanModel.class, new DynamoDBScanExpression());
    }

    public MealPlanModel findByUsername(String username) {
        PaginatedScanList<MealPlanModel> scanResult = dynamoDBMapper.scan(MealPlanModel.class, new DynamoDBScanExpression());
        MealPlanModel modelData = null;
        for (MealPlanModel model : scanResult) {
            if(model.getUsername().equals(username)){
                modelData = model;
                break;
            }
        }
        return modelData;
    }

    public MealPlanModel remove(String username, String recipeId) {
           PaginatedScanList<MealPlanModel> scanResult = dynamoDBMapper.scan(MealPlanModel.class, new DynamoDBScanExpression());
            MealPlanModel modelData = null;
           for (MealPlanModel model : scanResult) {

            System.out.println("Username: " + model.getUsername());
            System.out.println("Input username: " + username);
                if(model.getUsername().equals(username)){
                    if(model.getBreakfast() != null && model.getBreakfast().getRecipeId().equals(recipeId)) {
                        model.setBreakfast(null);
                        dynamoDBMapper.save(model);
                        return model;
                    } else if(model.getLunch() != null && model.getLunch().getRecipeId().equals(recipeId)) {
                        model.setLunch(null);
                        dynamoDBMapper.save(model);
                        return model;
                    } else if(model.getDinner() != null && model.getDinner().getRecipeId().equals(recipeId)) {
                        model.setDinner(null);
                        dynamoDBMapper.save(model);
                        return model;
                    }
                    else if(model.getSnack() != null && model.getSnack().getRecipeId().equals(recipeId)){
                        model.setSnack(null);
                        dynamoDBMapper.save(model);
                        return model;
                    }

                    System.out.println("I am within");
                    modelData = model;
                    break;
                }
           }

           return modelData;
    }

    public void setDynamoDBMapper(DynamoDBMapper dynamoDBMapper){
        this.dynamoDBMapper = dynamoDBMapper;
    }
}