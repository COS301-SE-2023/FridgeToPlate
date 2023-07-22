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
    public Recipe[] unconvert(SpoonacularRecipe[] object) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'unconvert'");
    }

    public SpoonacularResponse spoonacularTest(SpoonacularResponse response){

        SpoonacularRecipe[] recipeList = response.getResults();
        
        if(recipeList.length > 0){
            for(int i = 0; i < recipeList.length; i++){
                System.out.println("Recipe Title: " + recipeList[i].getTitle() + "\n" + recipeList[i].getImage());
            }            
        }

        return response;
    }
}
