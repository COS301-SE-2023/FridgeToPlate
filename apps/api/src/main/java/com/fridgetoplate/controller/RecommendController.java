package com.fridgetoplate.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.fridgetoplate.interfaces.Recipe;
import com.fridgetoplate.model.RecipeModel;
import com.fridgetoplate.repository.RecipeRepository;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE })
@RequestMapping("/recommend")

public class RecommendController {
    @Autowired
    private RecipeRepository recipeRepository;

    @GetMapping
    public List<RecipeModel> findAll() {
        return recipeRepository.findAll();
    }
}