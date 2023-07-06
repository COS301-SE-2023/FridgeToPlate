package com.fridgetoplate.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.fridgetoplate.model.MealPlan;

@Repository
public class MealPlanRepository {

    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    public MealPlan save(MealPlan mealPlan) {
        dynamoDBMapper.save(mealPlan);
        return mealPlan;
    }

    public List<MealPlan> findAll() {
        return dynamoDBMapper.scan(MealPlan.class, new DynamoDBScanExpression());
    }
}