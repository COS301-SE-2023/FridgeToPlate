package com.fridgetoplate.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fridgetoplate.frontendmodels.RecipeFrontendModel;
import com.fridgetoplate.frontendmodels.RecipePreferencesFrontendModel; 
import com.fridgetoplate.repository.RecipeRepository;

import org.springframework.beans.factory.annotation.Value;


@Service
public class ExternalApiService {

    @Autowired
    private RecipeRepository recipeRepository;

    @Value("${spoonacular.baseUrl}")
   private String spoonacularbaseUrl;

   @Value("${spoonacular.apiKey}")
   private String spoonacularPrivateKey;

    @Autowired
    private RestTemplate template = new RestTemplate();
    
    public List<RecipeFrontendModel> spoonacularRecipeSearch(RecipePreferencesFrontendModel recipePreferences){

        //String recipeSearchEndpoint = spoonacularbaseUrl + "/recipes/complexSearch?apiKey=" + spoonacularPrivateKey + "&query=pasta";

        //String recipeSearchEndpoint = "https://google.com";

        //return template.getForObject( recipeSearchEndpoint , SpoonacularResponseModel.class);
      
        return recipeRepository.findAllByPreferences(recipePreferences);
    }
}
