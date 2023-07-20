package com.fridgetoplate.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fridgetoplate.model.SpoonacularRecipeModel;

import lombok.Value;

@Service
public class ExternalApiService {
    
    @Autowired
    private RestTemplate template = new RestTemplate();

    public SpoonacularRecipeModel[] spoonacularRecipeSearch(){}
}
