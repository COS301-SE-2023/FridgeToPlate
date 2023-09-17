//RecipeService.java
package com.fridgetoplate.service;

import java.util.ArrayList;
import java.util.List;

import com.fridgetoplate.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fridgetoplate.frontendmodels.RecipeFrontendModel;
import com.fridgetoplate.frontendmodels.RecipePreferencesFrontendModel;
import com.fridgetoplate.interfaces.Explore;
import com.fridgetoplate.interfaces.RecipeDesc;
import com.fridgetoplate.interfaces.YoubuteItem;
import com.fridgetoplate.model.Ingredient;
import com.fridgetoplate.model.IngredientModel;
import com.fridgetoplate.model.RecipeModel;
import com.fridgetoplate.model.Review;
import com.fridgetoplate.repository.RecipeRepository;

@Service
public class RecipeService {
    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private ExternalApiService externalApiService;

    public RecipeFrontendModel findById(String id){

        /*
         * Getting the Recipe Response
         */

         // Declaring the Recipe Response object
        RecipeFrontendModel recipeResponse = new RecipeFrontendModel();

        // Find the Recipe model
        RecipeModel recipeModel = recipeRepository.findById(id);

        if(recipeModel == null) {
            return null;
        }

        // Get ingredients for Recipe
        List<IngredientModel> ingredientsModel = recipeRepository.findIngredientsByRecipeId(id);

        List<Ingredient> ingredients = new ArrayList<>();
        for (IngredientModel ingredientModel : ingredientsModel) {
            Ingredient ingredient = new Ingredient();
            ingredient.setName(ingredientModel.getName());
            ingredient.setAmount(ingredientModel.getAmount());

            if (ingredientModel.getUnit() !=  null) {
              ingredient.setUnit(ingredientModel.getUnit());
            } else {
              ingredient.setUnit("");
            }

            ingredients.add(ingredient);
        }

        // Getting recipe attributes
        String recipeId = recipeModel.getRecipeId();
        String difficulty = recipeModel.getDifficulty();
        String recipeImage = recipeModel.getRecipeImage();
        String name = recipeModel.getName();
        List<String> tags = recipeModel.getTags();
        String meal = recipeModel.getMeal();
        String description = recipeModel.getDescription();
        Integer prepTime = recipeModel.getPrepTime();
        List<String> instructions = recipeModel.getSteps();
        String creator = recipeModel.getCreator();
        Integer servings = recipeModel.getServings();
        Double rating = recipeModel.getRating();
        String youtubeId = recipeModel.getYoutubeId();

        // Creating recipe response
        recipeResponse.setRecipeId(recipeId);
        recipeResponse.setDifficulty(difficulty);
        recipeResponse.setRecipeImage(recipeImage);
        recipeResponse.setName(name);
        recipeResponse.setTags(tags);
        recipeResponse.setMeal(meal);
        recipeResponse.setDescription(description);
        recipeResponse.setIngredients(ingredients);
        recipeResponse.setPrepTime(prepTime);
        recipeResponse.setSteps(instructions);
        recipeResponse.setCreator(creator);
        recipeResponse.setServings(servings);
        recipeResponse.setRating(rating);
        recipeResponse.setYoutubeId(youtubeId);

        /*
        * Getting the Reviews
        */

        // Declaring the Reviews object
        List<Review> reviews = reviewService.getReviewsById(recipeId);

        // Adding the reviews to the recipe response
        recipeResponse.setReviews(reviews);

       return recipeResponse;
    }

    public RecipeFrontendModel save(RecipeFrontendModel recipe){

      if(recipe.getRecipeId() != null){
        RecipeModel recipeModel = recipeRepository.findById(recipe.getRecipeId());

        if(recipeModel != null) {
            return this.findById(recipeModel.getRecipeId());
        }
      }

        RecipeModel model = new RecipeModel();
        model.setRecipeId(recipe.getRecipeId());
        model.setDifficulty(recipe.getDifficulty());
        model.setRecipeImage(recipe.getRecipeImage());
        model.setName(recipe.getName());
        model.setTags(recipe.getTags());
        model.setMeal(recipe.getMeal());
        model.setDescription(recipe.getDescription());
        model.setPrepTime(recipe.getPrepTime());
        model.setSteps(recipe.getSteps());
        model.setCreator(recipe.getCreator());
        model.setServings(recipe.getServings());
        model.setViews(0);
        model.setRating(recipe.getRating());

        if (recipe.getYoutubeId() != null && !recipe.getYoutubeId().isEmpty()) {
          String ytId = recipe.getYoutubeId();
          
          int i = ytId.indexOf("v=");
          if (i > 0) {
            int j = ytId.indexOf("&");

            ytId = ytId.substring(i + 2, j);
          }

          model.setYoutubeId(recipe.getYoutubeId());
        } else {
          YoubuteItem[] videos = externalApiService.spoonacularVideoSearch(recipe.getName()).getItems();
          if (videos.length > 0) {
            model.setYoutubeId(videos[0].getId().videoId);
          }
        }

        recipeRepository.saveRecipe(model);

        recipe.setRecipeId(model.getRecipeId());

        for (Ingredient ingredient : recipe.getIngredients()) {
            IngredientModel ingredientModel = new IngredientModel();
            ingredientModel.setRecipeId(recipe.getRecipeId());
            ingredientModel.setName(ingredient.getName());
            ingredientModel.setAmount(ingredient.getAmount());
            ingredientModel.setUnit(ingredient.getUnit());

            recipeRepository.saveIngredient(ingredientModel);
        }
        return recipe;
    }

    public RecipeFrontendModel update(RecipeFrontendModel recipe){

        RecipeModel model = new RecipeModel();
        model.setRecipeId(recipe.getRecipeId());
        model.setDifficulty(recipe.getDifficulty());
        model.setRecipeImage(recipe.getRecipeImage());
        model.setName(recipe.getName());
        model.setTags(recipe.getTags());
        model.setMeal(recipe.getMeal());
        model.setDescription(recipe.getDescription());
        model.setPrepTime(recipe.getPrepTime());
        model.setSteps(recipe.getSteps());
        model.setCreator(recipe.getCreator());
        model.setServings(recipe.getServings());
        model.setViews(0);
        model.setRating(recipe.getRating());
        model.setYoutubeId(recipe.getYoutubeId());

        recipeRepository.saveRecipe(model);

        recipe.setRecipeId(model.getRecipeId());

        List<IngredientModel> currIngredients = this.findIngredientsByRecipeId(recipe.getRecipeId());
        recipeRepository.removeIngredients(currIngredients);

        for (Ingredient ingredient : recipe.getIngredients()) {

          IngredientModel ingredientModel = new IngredientModel();
          ingredientModel.setRecipeId(recipe.getRecipeId());
          ingredientModel.setName(ingredient.getName());
          ingredientModel.setAmount(ingredient.getAmount());
          ingredientModel.setUnit(ingredient.getUnit());

          recipeRepository.saveIngredient(ingredientModel);
        }

        return recipe;
    }

    public RecipeDeleteResponseModel delete(String id) {
        RecipeDeleteResponseModel response = new RecipeDeleteResponseModel();
      try{
        RecipeModel recipe = recipeRepository.findById(id);

        if (recipe == null) {
          response.setResponse("NOT FOUND");
        }

        recipeRepository.removeIngredients(recipeRepository.findIngredientsByRecipeId(id));
        reviewService.removeReviews(reviewService.getReviewsById(id));
        recipeRepository.deleteRecipe(recipe);
        response.setResponse("RECIPE SUCCESSFULLY DELETED");
      }
      catch (Exception exception){
        response.setResponse(exception.getMessage());
        return response;
      }
      return response;
    }

    public List<RecipeDesc> getCreatedRecipes(String username) {
        List<RecipeDesc> recipes = new ArrayList<>();
        List<RecipeModel> scanResult = recipeRepository.getCreatedRecipes(username);

        for (RecipeModel recipeModel : scanResult) {
          RecipeDesc recipeDesc = new RecipeDesc();
          recipeDesc.setRecipeId(recipeModel.getRecipeId());
          recipeDesc.setName(recipeModel.getName());
          recipeDesc.setRecipeImage(recipeModel.getRecipeImage());
          recipeDesc.setTags(recipeModel.getTags());
          recipeDesc.setDifficulty(recipeModel.getDifficulty());
          recipeDesc.setRating(recipeModel.getRating());
          recipes.add(recipeDesc);
        }

        return recipes;
    }


    public List<RecipeDesc> getSavedRecipes(List<String> ids) {
        List<RecipeDesc> recipes = new ArrayList<>();

        if(ids == null || ids.isEmpty()) {
            return recipes;
        }

        RecipeFrontendModel retrievedRecipeFrontendModel;

        for (String id : ids) {

          retrievedRecipeFrontendModel = findById(id);

            if (retrievedRecipeFrontendModel.getRecipeId().equals(id)) {
                RecipeDesc recipeDesc = new RecipeDesc();
                recipeDesc.setRecipeId(retrievedRecipeFrontendModel.getRecipeId());
                recipeDesc.setName(retrievedRecipeFrontendModel.getName());
                recipeDesc.setRecipeImage(retrievedRecipeFrontendModel.getRecipeImage());
                recipeDesc.setTags(retrievedRecipeFrontendModel.getTags());
                recipeDesc.setDifficulty(retrievedRecipeFrontendModel.getDifficulty());
                recipeDesc.setRating(retrievedRecipeFrontendModel.getRating());
                recipes.add(recipeDesc);
            }

        }

        return recipes;
    }

    public List<RecipeDesc> findAllByPreferences(RecipePreferencesFrontendModel recipePreferences, List<Ingredient> userIngredients) {

      List<IngredientModel> ingredientModels;
      RecipeFrontendModel recipe;
      List<RecipeFrontendModel> recipes = new ArrayList<>();

      // Getting recipes from the specificied ingredients
      for (Ingredient ingredient : userIngredients) {
        ingredientModels = recipeRepository.getIngredientModels(ingredient.getName());

        for (IngredientModel ingredientModel : ingredientModels) {
          recipe = findById(ingredientModel.getRecipeId());

          if (recipes.contains(recipe) == false) {
              recipes.add(recipe);
          }
        }
      }

      // Getting recipes from the specificied preferences
      List<RecipeDesc> recipesSortByPreferences = new ArrayList<>();

      // Extracting the rating from the preferences
      String preferredRatingStr = recipePreferences.getRating().trim();

      Double preferredRating = 0.0;
      if (!preferredRatingStr.isEmpty()) {  
        preferredRating = (double) Character.getNumericValue(preferredRatingStr.charAt(0));
      }

      // Extracting the servings from the preferences
      String preferredServingsStr;
      Integer preferredServingUpper = 0, preferredServingLower = 0;

      if (recipePreferences.getServings().contains("-")) {
        preferredServingsStr = recipePreferences.getServings().trim();
        int index = preferredServingsStr.indexOf("-");
        preferredServingUpper = Character.getNumericValue(preferredServingsStr.charAt(index+1));
      } else if (recipePreferences.getServings().contains("+")) {
        preferredServingsStr = recipePreferences.getServings().trim();
        preferredServingLower = Character.getNumericValue(preferredServingsStr.charAt(0));
      }

      // Extracting the prep time from the preferences
      Integer preferredPrepTimeUpper = 0, preferredPrepTimeLower = 0;

      if (recipePreferences.getPrepTime().contains("<")) {
          preferredPrepTimeUpper = 30;
      }
      else if (recipePreferences.getPrepTime().contains("-")) {
          preferredPrepTimeUpper = 60;
      }
      else if (recipePreferences.getPrepTime().contains("+")) {
          preferredPrepTimeLower = 60;
      }

      for (RecipeFrontendModel selectedRecipe : recipes) {

        if ((selectedRecipe.getDifficulty().equals(recipePreferences.getDifficulty())) || 
            (selectedRecipe.getMeal().equals(recipePreferences.getMeal())) ||
            (selectedRecipe.getRating() != null && selectedRecipe.getRating().compareTo(preferredRating) >= 0) || 
            (selectedRecipe.getServings().compareTo(preferredServingUpper) <= 0) || 
            (selectedRecipe.getServings().compareTo(preferredServingLower) >= 0) ||
            (selectedRecipe.getPrepTime().compareTo(preferredPrepTimeUpper) <= 0) || 
            (selectedRecipe.getPrepTime().compareTo(preferredPrepTimeLower) >= 0)
          ) {

            if (recipesSortByPreferences.size() <= 24) {
              RecipeDesc recipeDesc = new RecipeDesc();
              recipeDesc.setRecipeId(selectedRecipe.getRecipeId());
              recipeDesc.setName(selectedRecipe.getName());
              recipeDesc.setRecipeImage(selectedRecipe.getRecipeImage());
              recipeDesc.setTags(selectedRecipe.getTags());
              recipeDesc.setDifficulty(selectedRecipe.getDifficulty());
              recipeDesc.setRating(selectedRecipe.getRating());
              recipesSortByPreferences.add(recipeDesc);
            }
            else {
              break;
            }
        }
      }

      return recipesSortByPreferences;
    }

    public RecipeFrontendModel[] saveBatch(RecipeFrontendModel[] recipeList) {
        for (RecipeFrontendModel recipeFrontendModel : recipeList) {
            this.save(recipeFrontendModel);
        }
        return recipeList;
    }

    public List<RecipeFrontendModel> getRecipesByRecipeName(String recipeName) {
      List<RecipeFrontendModel> recipes = new ArrayList<>();

      List<RecipeModel> scanResult = recipeRepository.getRecipesByRecipeName(recipeName);

      for (RecipeModel recipe : scanResult) {
          RecipeFrontendModel response = this.findById(recipe.getRecipeId());
          if(response != null) {
              recipes.add(response);
          }
      }

      return recipes;
  }

  public List<RecipeModel> filterSearch(Explore searchObject){
      return this.recipeRepository.filterSearch(searchObject);
  }

  public List<IngredientModel> findIngredientsByRecipeId(String recipeId){
    return this.recipeRepository.findIngredientsByRecipeId(recipeId);
  }

  public RecipeFrontendModel updateRatingRatingAndViews(RecipeFrontendModel recipe){

      RecipeModel model = new RecipeModel();
      RecipeModel recipeModel = recipeRepository.findById(recipe.getRecipeId());

      if(recipeModel.getRating() != null && recipeModel.getRating().equals(recipe.getRating()) == false) {
          model.setViews(recipeModel.getViews());
      }
      
      if(recipeModel.getRating() != null && recipeModel.getRating().equals(recipe.getRating())) {
          model.setViews(recipeModel.getViews() + 1);
      }

      model.setRecipeId(recipe.getRecipeId());
      model.setDifficulty(recipe.getDifficulty());
      model.setRecipeImage(recipe.getRecipeImage());
      model.setName(recipe.getName());
      model.setTags(recipe.getTags());
      model.setMeal(recipe.getMeal());
      model.setDescription(recipe.getDescription());
      model.setPrepTime(recipe.getPrepTime());
      model.setSteps(recipe.getSteps());
      model.setCreator(recipe.getCreator());
      model.setServings(recipe.getServings());
      model.setRating(recipe.getRating());

      recipeRepository.saveRecipe(model);

      recipe.setRecipeId(model.getRecipeId());

      return recipe;
  }

}
