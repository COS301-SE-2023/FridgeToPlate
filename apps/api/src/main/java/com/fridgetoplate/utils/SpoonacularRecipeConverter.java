package com.fridgetoplate.utils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverter;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fridgetoplate.frontendmodels.RecipeFrontendModel;
import com.fridgetoplate.interfaces.ExtendedIngredient;
import com.fridgetoplate.interfaces.SpoonacularIngredient;
import com.fridgetoplate.interfaces.SpoonacularRecipe;
import com.fridgetoplate.interfaces.SpoonacularStep;
import com.fridgetoplate.model.Ingredient;
import com.fridgetoplate.model.Review;

public class SpoonacularRecipeConverter implements DynamoDBTypeConverter<SpoonacularRecipe[], RecipeFrontendModel[]> {
    private static final ObjectMapper mapper = new ObjectMapper();

    @Override
    public SpoonacularRecipe[] convert(RecipeFrontendModel[] object) {
        throw new UnsupportedOperationException("Unimplemented method 'convert'");
    }

    @Override
    public RecipeFrontendModel[] unconvert(SpoonacularRecipe[] spoonacularRecipes) {

        if(spoonacularRecipes != null){

            SpoonacularMiscUtils utils = new SpoonacularMiscUtils();

            List<RecipeFrontendModel> convertedRecipes = new ArrayList<RecipeFrontendModel>();
 
            for(int i = 0; i < spoonacularRecipes.length; i++){
                
                RecipeFrontendModel newRecipe = new RecipeFrontendModel();
                
                SpoonacularRecipe currentRecipe = spoonacularRecipes[i];

                List<Ingredient> currentIngredients = new ArrayList<Ingredient>();

                List<String> currentRecipeSteps = new ArrayList<String>();

                newRecipe.setRecipeImage(currentRecipe.getImage());

                newRecipe.setName(currentRecipe.getTitle());

                newRecipe.setRecipeId(String.valueOf(currentRecipe.getId()));

                newRecipe.setTags(utils.generateRecipeTags( currentRecipe.getCuisines(), currentRecipe.getDishTypes(), currentRecipe.getDiets() ) );
                
                //Add recipe ingredients
                if(currentRecipe.getExtendedIngredients().length != 0){
                    ExtendedIngredient[] recipeIngredientList = currentRecipe.getExtendedIngredients();

                    for(int x = 0; x < recipeIngredientList.length; x++){
                        Ingredient newIngredient = new Ingredient();

                        String ingredientName = recipeIngredientList[x].getName();

                        if(ingredientName.length() > 0){

                            newIngredient.setName( ingredientName.substring(0, 1).toUpperCase() + ingredientName.substring(1) );
    
                            newIngredient.setAmount( (double) Math.round(recipeIngredientList[x].getAmount() * 1000d) / 1000d);
    
                            if(recipeIngredientList[x].getMeasures().getMetric() != null && recipeIngredientList[x].getMeasures().getMetric().getUnitShort() != null)
                                newIngredient.setUnit(recipeIngredientList[x].getMeasures().getMetric().getUnitShort());
                            else
                            newIngredient.setUnit("unit");
    
                            if(!currentIngredients.contains(newIngredient))
                                currentIngredients.add(newIngredient);                    
                        }
                            
                    }
                }

                newRecipe.setIngredients(currentIngredients);

                //Add recipe steps                
                if(currentRecipe.getAnalyzedInstructions().length != 0){
                    SpoonacularStep[] recipeSteps = currentRecipe.getAnalyzedInstructions()[0].getSteps();

        
                    for(int x = 0; x < recipeSteps.length; x++){
                        SpoonacularStep currentStep = recipeSteps[x];

                        currentRecipeSteps.add(currentStep.getStep());

                    }
                    
                    //Iterate through steps and add
                    newRecipe.setSteps(currentRecipeSteps);

                    newRecipe.setIngredients(currentIngredients);
                }

                //Create difficulty evaluation function
                newRecipe.setDifficulty(utils.estimateRecipeDifficulty(currentRecipe.getCookingMinutes(), currentIngredients));

                newRecipe.setDescription(currentRecipe.getSummary());
                
                newRecipe.setMeal(currentRecipe.getDishTypes()[0]);

                newRecipe.setPrepTime(currentRecipe.getReadyInMinutes());
                
                newRecipe.setServings(currentRecipe.getServings());


                newRecipe.setCreator("Spoonacular");

                newRecipe.setReviews( new ArrayList<Review>() );

                convertedRecipes.add(newRecipe);
            }

            return convertedRecipes.toArray(new RecipeFrontendModel[convertedRecipes.size()]);
        }
    
        return null;
    }


    public RecipeFrontendModel[] combineQueryResults(RecipeFrontendModel[] apiResults, RecipeFrontendModel[] dbResults){
        if(apiResults == null || dbResults == null)
            return null;
        
        RecipeFrontendModel[] resultArray = Arrays.copyOf(apiResults, apiResults.length + dbResults.length);

        System.arraycopy(dbResults, 0, resultArray , apiResults.length, dbResults.length );
        
        return resultArray;
    }
}
