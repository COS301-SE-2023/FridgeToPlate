package com.fridgetoplate.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fridgetoplate.model.MealPlan;
import com.fridgetoplate.repository.MealPlanRepository;

@RestController
@RequestMapping("/mealplans")
public class MealPlanController {

    @Autowired
    private MealPlanRepository mealPlanRepository;

    @PostMapping("/create")
    public MealPlan save(@RequestBody MealPlan mealPlan) {
        return mealPlanRepository.save(mealPlan);
    }

    @GetMapping
    public List<MealPlan> findAll() {
        return mealPlanRepository.findAll();
    }
}