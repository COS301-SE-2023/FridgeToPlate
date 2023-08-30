package com.fridgetoplate.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fridgetoplate.frontendmodels.RecipeFrontendModel;
import com.fridgetoplate.frontendmodels.RecipePreferencesFrontendModel;
import com.fridgetoplate.interfaces.RecipeDesc;
import com.fridgetoplate.model.Ingredient;
import com.fridgetoplate.model.IngredientModel;
import com.fridgetoplate.model.RecipeModel;
import com.fridgetoplate.model.Review;
import com.fridgetoplate.repository.RecipeRepository;
import com.fridgetoplate.repository.ReviewRepository;

@Service
public class RecipeService {
    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private ReviewRepository reviewRepository;

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
            ingredient.setUnit(ingredientModel.getUnit());

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

        /*
        * Getting the Reviews
        */

        // Declaring the Reviews object 
        List<Review> reviews = reviewRepository.getReviewsById(recipeId);

        // Adding the reviews to the recipe response
        recipeResponse.setReviews(reviews);

       return recipeResponse;
    }

    public List<RecipeDesc> getCreatedRecipes(String username) {
        return recipeRepository.getCreatedRecipes(username);
    }


    public List<RecipeDesc> getSavedRecipes(List<String> ids) {
        return recipeRepository.getSavedRecipes(ids);
    }

    public List<RecipeFrontendModel> findAllByPreferences(RecipePreferencesFrontendModel recipePreferences, List<Ingredient> userIngredients) {
        return recipeRepository.findAllByPreferences(recipePreferences, userIngredients);
    }

    public RecipeFrontendModel[] saveBatch(RecipeFrontendModel[] recipeList) {
        for (RecipeFrontendModel recipeFrontendModel : recipeList) {
            recipeRepository.save(recipeFrontendModel);
        }
        return recipeList;
    }
}
