package com.fridgetoplate.utils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverter;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fridgetoplate.frontendmodels.RecipeFrontendModel;
import com.fridgetoplate.interfaces.SpoonacularIngredient;
import com.fridgetoplate.interfaces.SpoonacularRecipe;
import com.fridgetoplate.interfaces.SpoonacularStep;
import com.fridgetoplate.model.Ingredient;
import com.fridgetoplate.model.RecipeModel;
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

                newRecipe.setTags(utils.generateRecipeTags( currentRecipe.getCuisines(), currentRecipe.getDishTypes(), currentRecipe.getDiets() ) );
                
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

                                if(!currentIngredients.contains(newIngredient))
                                    currentIngredients.add(newIngredient);
                            }
                        }

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

    public RecipeModel[] toRecipeModelArray(RecipeFrontendModel[] apiResults){
        if(apiResults == null)
            return null;
        
        List<RecipeModel> convertedResults = new ArrayList<RecipeModel>();

        for(int i = 0; i < apiResults.length; i++){
            RecipeModel newRecipe = new RecipeModel();

            newRecipe.setName(apiResults[i].getName());

            newRecipe.setDescription(apiResults[i].getDescription());

            newRecipe.setDifficulty(apiResults[i].getDifficulty());

            newRecipe.setRecipeImage(apiResults[i].getRecipeImage());

            newRecipe.setMeal(apiResults[i].getMeal());

            newRecipe.setPrepTime(apiResults[i].getPrepTime());

            newRecipe.setServings(apiResults[i].getServings());

            newRecipe.setCreator(apiResults[i].getCreator());

            newRecipe.setViews(0);

            newRecipe.setSteps(apiResults[i].getSteps());

            newRecipe.setIngredients(apiResults[i].getIngredients());

            newRecipe.setTags(apiResults[i].getTags());

            convertedResults.add(newRecipe);
        }

        return convertedResults.toArray(new RecipeModel[convertedResults.size()]);
    }
}