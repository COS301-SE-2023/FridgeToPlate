package com.fridgetoplate.utils;

import java.util.List;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverter;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fridgetoplate.interfaces.Recipe;
import com.fridgetoplate.model.SpoonacularRecipeModel;
import com.fridgetoplate.model.SpoonacularResponseModel;

public class SpoonacularRecipeConverter implements DynamoDBTypeConverter<SpoonacularRecipeModel[], Recipe[]> {
    private static final ObjectMapper mapper = new ObjectMapper();

    @Override
    public SpoonacularRecipeModel[] convert(Recipe[] object) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'convert'");
    }

    @Override
    public Recipe[] unconvert(SpoonacularRecipeModel[] object) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'unconvert'");
    }

    public SpoonacularResponseModel spoonacularTest(SpoonacularResponseModel response){

        SpoonacularRecipeModel[] recipeList = response.getResults();
        
        if(recipeList.length > 0){
            for(int i = 0; i < recipeList.length; i++){
                System.out.println("Recipe Title: " + recipeList[i].getTitle() + "\n" + recipeList[i].getImage());
            }            
        }

        return response;
    }
}
