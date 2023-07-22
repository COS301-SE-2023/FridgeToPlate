package com.fridgetoplate.utils;

import java.util.List;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverter;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fridgetoplate.interfaces.Recipe;
import com.fridgetoplate.interfaces.SpoonacularRecipe;
import com.fridgetoplate.interfaces.SpoonacularResponse;

public class SpoonacularRecipeConverter implements DynamoDBTypeConverter<SpoonacularRecipe[], Recipe[]> {
    private static final ObjectMapper mapper = new ObjectMapper();

    @Override
    public SpoonacularRecipe[] convert(Recipe[] object) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'convert'");
    }

    @Override
    public Recipe[] unconvert(SpoonacularRecipe[] spoonacularRecipes) {

        if(spoonacularRecipes != null){

            for(int i = 0; i < spoonacularRecipes.length; i++){
                
                Recipe newRecipe = new Recipe();
                
                SpoonacularRecipe currentRecipe = spoonacularRecipes[i];

                //TODO: Potemntial hash for ID
                //newRecipe.setRecipeId(null);

                newRecipe.setRecipeImage(currentRecipe.getImage());

                newRecipe.setName(currentRecipe.getTitle());

                //Combine cuisines, dish types and diets 
                newRecipe.setTags(null);
                
                //Create difficulty evaluation function
                newRecipe.setDifficulty(null);

                //Create take subset function
                newRecipe.setDescription("");
                

                newRecipe.setMeal(null);

                newRecipe.setPrepTime(currentRecipe.getCookingMinutes());
                
                //Create serving size estimator
                newRecipe.setServings(null);

                //Iterate through ingredients and add
                newRecipe.setIngredients(null);
                
                //Iterate through steps and add
                newRecipe.setSteps(null);

                newRecipe.setCreator("Spoonacular");
            }
        }
    }

    public SpoonacularResponse spoonacularTest(SpoonacularResponse response){

        System.out.println("In Here: ");

        SpoonacularRecipe[] recipeList = response.getResults();
        
        if(recipeList.length > 0){
            for(int i = 0; i < recipeList.length; i++){
                
            }            
        }

        return response;
    }
}
