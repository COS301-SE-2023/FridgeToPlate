package com.fridgetoplate.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fridgetoplate.frontendmodels.RecipeFrontendModel;
import com.fridgetoplate.frontendmodels.RecipePreferencesFrontendModel;
import com.fridgetoplate.interfaces.SpoonacularResponse;
import com.fridgetoplate.model.Ingredient;
import com.fridgetoplate.repository.RecipeRepository;

import org.springframework.beans.factory.annotation.Value;

import java.util.Arrays;

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
   
   List<String> cuisineList = Arrays.asList(
       "African",
       "Asian",
       "American",
       "British",
       "Cajun",
       "Caribbean",
       "Chinese",
       "Eastern European",
       "European",
       "French",
       "German",
       "Greek",
       "Indian",
       "Irish",
       "Italian",
       "Japanese",
       "Jewish",
       "Korean",
       "Latin American",
       "Mediterranean",
       "Mexican",
       "Middle Eastern",
       "Nordic",
       "Southern",
       "Spanish",
       "Thai",
       "Vietnamese"
       );
    
    Set<String> cuisineSet = new HashSet<String>(cuisineList);
    
    
    
    List<String> mealTypeList = Arrays.asList(
        "main course",
        "side dish",
        "dessert",
        "appetizer",
        "salad",
        "bread",
        "breakfast",
        "soup",
        "beverage",
        "sauce",
        "marinade",
        "fingerfood",
        "snack",
        "drink"
        );
        
        Set<String> mealTypeSet = new HashSet<String>(mealTypeList);

        
        List<String> dietList = Arrays.asList(
            "Gluten Free",
            "Ketogenic",
            "Vegetarian",
            "Lacto-Vegetarian",
            "Ovo-Vegetarian",
            "Vegan",
            "Pescetarian",
            "Paleo",
            "Primal",
            "Low FODMAP",
            "Whole30"
            );
            
            Set<String> dietSet = new HashSet<String>(dietList);
            
    public SpoonacularResponse spoonacularRecipeSearch(RecipePreferencesFrontendModel recipePreferences,List<Ingredient> userIngredients){

        String recipeSearchEndpoint = spoonacularbaseUrl + "/recipes/complexSearch?apiKey=" + spoonacularPrivateKey;
        
        if(recipePreferences.getPrepTime() != null)
            recipeSearchEndpoint += "&maxReadyTime=" + recipePreferences.getPrepTime().substring(0, 2);

        if(userIngredients != null && userIngredients.size() != 0){
            
            String ingredientsListString = "&includeIngredients=";
             for(int i = 0; i < userIngredients.size(); i++){
                
                ingredientsListString += userIngredients.get(i).getName().toLowerCase();
                
                 if(i < userIngredients.size() - 1)
                    ingredientsListString += ",";
             }

             recipeSearchEndpoint += ingredientsListString;
        }


        if(recipePreferences.getKeywords() != null && recipePreferences.getKeywords().length != 0){
            String[] keywordsList = recipePreferences.getKeywords();
            
            String dietPreferences = "";

            String cuisinePreferences = "";
            
            String mealPreference = "";

            String titlePreference = "";

            for(int i = 0; i < keywordsList.length; i++){
                if(cuisineSet.contains(keywordsList[i].strip())){
                    if(cuisinePreferences.length() != 0)
                        cuisinePreferences += "," + keywordsList[i].strip();
                    else
                        cuisinePreferences += keywordsList[i].strip();
                    continue;
                }

                if(mealTypeSet.contains(keywordsList[i].strip().toLowerCase())){
                    if(mealPreference.length() != 0)
                        mealPreference += "," + keywordsList[i].strip();
                    else
                        mealPreference += keywordsList[i].strip();
                    continue;                    
                }

                if(dietSet.contains(keywordsList[i].strip())){
                    if(dietPreferences.length() != 0)
                        dietPreferences += "," + keywordsList[i].strip();
                    else
                        dietPreferences += keywordsList[i].strip();
                    continue;
                }

                else{
                    if(titlePreference.length() != 0)
                        titlePreference += "," + keywordsList[i].strip();
                    else
                        titlePreference += keywordsList[i].strip();
                    continue;
                }
            }
        
            if(!dietPreferences.isEmpty())
                recipeSearchEndpoint += "&diet=" + dietPreferences;
            
            if(!cuisinePreferences.isEmpty())
                recipeSearchEndpoint += "&cuisine=" + cuisinePreferences;
            
            if(!mealPreference.isEmpty())
                recipeSearchEndpoint += "&mealType=" + mealPreference;            

            if(!titlePreference.isEmpty())
                recipeSearchEndpoint += "&titleMatch=" + titlePreference;
        }

        recipeSearchEndpoint += "&fillIngredients=true&addRecipeInformation=true&ranking=1";

        return template.getForObject( recipeSearchEndpoint , SpoonacularResponse.class);
      
    }
}
