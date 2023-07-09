package com.fridgetoplate.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.fridgetoplate.repository.RecipeRepository;
import com.fridgetoplate.response.RecipeResponse;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE })
@RequestMapping("/recommend")

public class RecommendController {
    @Autowired
    private RecipeRepository recipeRepository;

    @GetMapping
    public List<RecipeResponse> findAll() {
        return recipeRepository.findAll();
    }
}