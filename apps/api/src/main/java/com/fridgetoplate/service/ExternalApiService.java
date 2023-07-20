package com.fridgetoplate.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fridgetoplate.frontendmodels.RecipePreferencesFrontendModel;
import com.fridgetoplate.model.SpoonacularRecipeModel;

import org.springframework.beans.factory.annotation.Value;


@Service
public class ExternalApiService {
    
    @Value("${spoonacular.baseUrl}")
   private String spoonacularbaseUrl;
    
    @Autowired
    private RestTemplate template = new RestTemplate();
    
    public void spoonacularRecipeSearch(){
        //return template.getForObject(null, null, null)
        System.out.println("HELLO WORLD!");
        System.out.println(spoonacularbaseUrl);
    }
}
