package com.fridgetoplate.utils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverter;
import com.fridgetoplate.frontendmodels.RecipeFrontendModel;
import com.fridgetoplate.interfaces.ExtendedIngredient;
import com.fridgetoplate.interfaces.SpoonacularRecipe;
import com.fridgetoplate.interfaces.SpoonacularStep;
import com.fridgetoplate.model.Ingredient;
import com.fridgetoplate.model.Review;

public class SpoonacularRecipeConverter implements DynamoDBTypeConverter<SpoonacularRecipe[], RecipeFrontendModel[]> {

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

                if (currentRecipe.getImage() != null)
                    newRecipe.setRecipeImage(convertImageUrl(currentRecipe.getImage()));
                else 
                    newRecipe.setRecipeImage("none");

                newRecipe.setName(currentRecipe.getTitle());

                newRecipe.setRecipeId(String.valueOf(currentRecipe.getId()));

                newRecipe.setTags(utils.generateRecipeTags( currentRecipe.getCuisines(), currentRecipe.getDishTypes(), currentRecipe.getDiets() ) );
                
                //Add recipe ingredients
                if(currentRecipe.getExtendedIngredients() != null && currentRecipe.getExtendedIngredients().length != 0){
                    ExtendedIngredient[] recipeIngredientList = currentRecipe.getExtendedIngredients();

                    for(int x = 0; x < recipeIngredientList.length; x++){
                        Ingredient newIngredient = new Ingredient();

                        String ingredientName;
                        if (recipeIngredientList[x].getNameClean() != null) {
                            ingredientName = recipeIngredientList[x].getNameClean();
                        } else {
                            ingredientName = recipeIngredientList[x].getName();
                        }

                        if(ingredientName.length() > 0) {

                            newIngredient.setName( ingredientName.substring(0, 1).toUpperCase() + ingredientName.substring(1) );
    
                            newIngredient.setAmount( (double) Math.round(recipeIngredientList[x].getMeasures().getMetric().getAmount() * 100) / 100 );
    
                            if(recipeIngredientList[x].getMeasures().getMetric() != null && recipeIngredientList[x].getMeasures().getMetric().getUnitShort() != null && !recipeIngredientList[x].getMeasures().getMetric().getUnitShort().isEmpty()) {
                                String ingredientUnit = recipeIngredientList[x].getMeasures().getMetric().getUnitShort();
                                if (ingredientUnit.equals("Tbsp") || ingredientUnit.equals("Tbsps") || ingredientUnit.equals("Tbs")) {
                                    ingredientUnit = "tbsp";
                                } else if (ingredientUnit.equals("tsps")) {
                                    ingredientUnit = "tsp";
                                } else if (ingredientUnit.equals("kgs")) {
                                    ingredientUnit = "kg";
                                }

                                newIngredient.setUnit(ingredientUnit);
                            } else {
                                newIngredient.setUnit("");
                            }
    
                            if(!currentIngredients.contains(newIngredient))
                                currentIngredients.add(newIngredient);               
                        }
                            
                    }
                } else {
                    System.out.println("Skip cause no ingredients");
                    continue;
                }

                newRecipe.setIngredients(currentIngredients);

                //Add recipe steps                
                if(currentRecipe.getAnalyzedInstructions() != null && currentRecipe.getAnalyzedInstructions().length != 0){
                    SpoonacularStep[] recipeSteps = currentRecipe.getAnalyzedInstructions()[0].getSteps();

        
                    for(int x = 0; x < recipeSteps.length; x++){
                        SpoonacularStep currentStep = recipeSteps[x];

                        currentRecipeSteps.add(currentStep.getStep());

                    }
                    
                    //Iterate through steps and add
                    newRecipe.setSteps(currentRecipeSteps);

                    newRecipe.setIngredients(currentIngredients);
                } else {
                    System.out.println("Skip cause no steps");
                    continue;
                }

                //Create difficulty evaluation function
                newRecipe.setDifficulty(utils.estimateRecipeDifficulty(currentRecipe.getCookingMinutes(), currentIngredients));

                newRecipe.setDescription(this.cleanSummary(currentRecipe.getSummary()));
                
                if (currentRecipe.getDishTypes().length > 0) {

                    for (String dishType : currentRecipe.getDishTypes()) {
                        if (dishType.equals("morning meal")) {
                            newRecipe.setMeal("breakfast");
                            break;
                        } else if (dishType.equals("main course")) {
                            newRecipe.setMeal("dinner");
                            break;
                        } else if (dishType.equals("breakfast") || 
                                    dishType.equals("snack") || 
                                    dishType.equals("lunch") ||
                                    dishType.equals("dinner") ||
                                    dishType.equals("dessert") ||
                                    dishType.equals("soup") ||
                                    dishType.equals("beverage") ||
                                    dishType.equals("salad")
                                ) 
                        {
                            newRecipe.setMeal(dishType);
                            break;
                        }
                    }

                    if (newRecipe.getMeal() == null) {
                        newRecipe.setMeal("snack");
                    }
                    
                } else {
                    newRecipe.setMeal("dinner");
                }
 
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

    private String cleanSummary(String summary) {
        int i = summary.indexOf("<");
        while (i >= 0) {
            int j = summary.indexOf(">");
            if (j >= 0) {
                summary = summary.substring(0, i) + summary.substring(j + 1);
            }

            i = summary.indexOf("<");
        }

        return summary;
    }

    private String convertImageUrl(String url) {
        int i = url.indexOf("-");
        if (i >= 0) {
            url = url.substring(0, i + 1);
        }

        return url + "636x393";
    }
}
