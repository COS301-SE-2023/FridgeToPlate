package com.fridgetoplate.utils;

import java.util.ArrayList;
import java.util.List;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverter;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fridgetoplate.interfaces.Recipe;
import com.fridgetoplate.interfaces.SpoonacularAnalyzedInstruction;
import com.fridgetoplate.interfaces.SpoonacularIngredient;
import com.fridgetoplate.interfaces.SpoonacularRecipe;
import com.fridgetoplate.interfaces.SpoonacularResponse;
import com.fridgetoplate.interfaces.SpoonacularStep;
import com.fridgetoplate.model.Ingredient;

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

            SpoonacularMiscUtils utils = new SpoonacularMiscUtils();

            List<Recipe> convertedRecipes = new ArrayList<Recipe>();
 
            for(int i = 0; i < spoonacularRecipes.length; i++){
                
                Recipe newRecipe = new Recipe();
                
                SpoonacularRecipe currentRecipe = spoonacularRecipes[i];

                List<Ingredient> currentIngredients = new ArrayList<Ingredient>();

                List<String> currentRecipeSteps = new ArrayList<String>();

                //TODO: Potemntial hash for ID
                //newRecipe.setRecipeId(null);

                newRecipe.setRecipeImage(currentRecipe.getImage());

                newRecipe.setName(currentRecipe.getTitle());

                newRecipe.setTags(utils.generateRecipeTags( currentRecipe.getCuisines(), currentRecipe.getDishTypes(), currentRecipe.getDiets() ) );
                
                //Create difficulty evaluation function
                newRecipe.setDifficulty(utils.estimateRecipeDifficulty(currentRecipe.getCookingMinutes(), null));

                newRecipe.setDescription(currentRecipe.getSummary());
                
                newRecipe.setMeal(currentRecipe.getDishTypes()[0]);

                newRecipe.setPrepTime(currentRecipe.getCookingMinutes());
                
                newRecipe.setServings(currentRecipe.getServings());

                //Iterate through ingredients and add                
                if(currentRecipe.getAnalyzedInstructions().length != 0){
                    SpoonacularStep[] recipeSteps = currentRecipe.getAnalyzedInstructions()[0].getSteps();

        
                    for(int x = 0; x < recipeSteps.length; x++){
                        SpoonacularStep currentStep = recipeSteps[x];

                        currentRecipeSteps.add(currentStep.getStep());

                        if(currentStep.getIngredients() != null){
                            SpoonacularIngredient[] stepIngredients = currentStep.getIngredients();
                            
                            for(int j = 0; j < stepIngredients.length; j++){
                                Ingredient newIngredient = new Ingredient();
                                
                                newIngredient.setName(stepIngredients[j].getName());
                                
                                newIngredient.setAmount(1);
                                
                                newIngredient.setUnit("unit");

                                currentIngredients.add(newIngredient);
                            }
                        }

                    }
                    
                    //Iterate through steps and add
                    newRecipe.setSteps(currentRecipeSteps);

                    newRecipe.setIngredients(currentIngredients);
                }

                newRecipe.setCreator("Spoonacular");

                convertedRecipes.add(newRecipe);
            }

            return convertedRecipes.toArray(new Recipe[convertedRecipes.size()]);
        }
    
        return null;
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
