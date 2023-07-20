package com.fridgetoplate.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fridgetoplate.frontendmodels.RecipePreferencesFrontendModel;
import com.fridgetoplate.model.SpoonacularRecipeModel;
import com.fridgetoplate.model.SpoonacularResponseModel;

import org.springframework.beans.factory.annotation.Value;


@Service
public class ExternalApiService {

    @Value("${spoonacular.baseUrl}")
   private String spoonacularbaseUrl;

   @Value("${spoonacular.apiKey}")
   private String spoonacularPrivateKey;

    @Autowired
    private RestTemplate template = new RestTemplate();
    
    public SpoonacularResponseModel spoonacularRecipeSearch(){

        String recipeSearchEndpoint = spoonacularbaseUrl + "/recipes/complexSearch?apiKey=" + spoonacularPrivateKey + "&query=pasta";

        return template.getForObject( recipeSearchEndpoint , SpoonacularResponseModel.class);
      
    }
}
