package com.fridgetoplate.repository;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBSaveExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.PaginatedScanList;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ExpectedAttributeValue;
import com.fridgetoplate.frontendmodels.RecipeFrontendModel;
import com.fridgetoplate.interfaces.Explore;
import com.fridgetoplate.interfaces.Recipe;
import com.fridgetoplate.model.Ingredient;
import com.fridgetoplate.model.RecipeModel;
import com.fridgetoplate.model.Review;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

@Repository
public class ExploreRepository {

    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    public RecipeFrontendModel findById(String id){

        /*
         * Getting the Recipe Response
         */

         // Declaring the Recipe Response object
        RecipeFrontendModel recipeResponse = new RecipeFrontendModel();


        // Find the Recipe model
        RecipeModel recipeModel = dynamoDBMapper.load(RecipeModel.class, id);

        if(recipeModel == null) {
            return null;
        }

        // Getting recipe attributes
        String recipeId = recipeModel.getRecipeId();
        String difficulty = recipeModel.getDifficulty();
        String recipeImage = recipeModel.getRecipeImage();
        String name = recipeModel.getName();
        List<String> tags = recipeModel.getTags();
        String meal = recipeModel.getMeal();
        String description = recipeModel.getDescription();
        List<Ingredient> ingredients = recipeModel.getIngredients();
        Integer prepTime = recipeModel.getPrepTime();
        List<String> instructions = recipeModel.getSteps();
        String creator = recipeModel.getCreator();
        Integer servings = recipeModel.getServings();

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


        /*
         * Getting the Reviews
         */

        // Declaring the Reviews object 
        List<Review> reviews = this.getReviewsById(recipeId);

        // Adding the reviews to the recipe response
        recipeResponse.setReviews(reviews);



       return recipeResponse;
    }

    public List<Review> getReviewsById(String id) {
        List<Review> reviews = new ArrayList<>();
        
        PaginatedScanList<Review> scanResult = dynamoDBMapper.scan(Review.class, new DynamoDBScanExpression());

        for (Review review : scanResult) {
            
            if (review.getRecipeId().equals(id)) {
                reviews.add(review);
            }
        }

        return reviews;
    }


    public List<RecipeFrontendModel> findAll(){
        List<RecipeFrontendModel> recipes = new ArrayList<>();
        
        PaginatedScanList<RecipeModel> scanResult = dynamoDBMapper.scan(RecipeModel.class, new DynamoDBScanExpression());

        for (RecipeModel recipe : scanResult) {
            
            RecipeFrontendModel response = findById(recipe.getRecipeId());
                if(response != null) {
                    recipes.add(response);
                }
        }

        return recipes;
    }

    public List<RecipeFrontendModel> findBySearch(Explore searchObject){
        List<RecipeFrontendModel> recipes = new ArrayList<>();
        
        PaginatedScanList<RecipeModel> scanResult = dynamoDBMapper.scan(RecipeModel.class, new DynamoDBScanExpression());

        for (RecipeModel recipe : scanResult) {
            
            RecipeFrontendModel response = findById(recipe.getRecipeId());
                if(response != null) {
                    recipes.add(response);
                }
        }

        String search = searchObject.getSearch();

        String type = searchObject.getType();

        List<String> tags = searchObject.getTags();

        String difficulty = searchObject.getDifficulty();

        if(search != "")
            fiterBySearch(search, recipes);

        if(type != "")
            fiterByType(type, recipes);

        if(tags.size() != 0)
            fiterByTags(tags, recipes);

        if(difficulty != "Any")
            fiterByDifficulty(difficulty, recipes);

        return recipes;
    }

    private void fiterBySearch(String search, List<RecipeFrontendModel> recipes) {

        for (RecipeFrontendModel recipe : recipes) {
            
                if(recipe.getName() != search) {
                    recipes.remove(recipe);
                }
        }
    }

    private void fiterByType(String type, List<RecipeFrontendModel> recipes) {

        for (Iterator<RecipeFrontendModel> iterator = recipes.iterator(); iterator.hasNext(); ) {
            RecipeFrontendModel recipe = iterator.next();
            if(recipe.getMeal() != type) {
                iterator.remove();
            }
        }
    }

    private void fiterByTags(List<String> tags, List<RecipeFrontendModel> recipes) {

        for (RecipeFrontendModel recipe : recipes) {

            HashSet<String> results = new HashSet<>(recipe.getTags());
            boolean anyItemsExist = false;

            for (String item : tags) {
                if (results.contains(item)) {
                    anyItemsExist = true;
                    break;
                }
            }

            if(anyItemsExist == false){
                recipes.remove(recipe);
            }
        }
    }

    private void fiterByDifficulty(String difficulty, List<RecipeFrontendModel> recipes) {

        for (RecipeFrontendModel recipe : recipes) {
            
                if(recipe.getDifficulty() != difficulty) {
                    recipes.remove(recipe);
                }
        }
    }

    
    
}

