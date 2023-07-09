package com.fridgetoplate.repository;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBSaveExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.PaginatedScanList;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ExpectedAttributeValue;
import com.fridgetoplate.interfaces.Recipe;
import com.fridgetoplate.model.Ingredient;
import com.fridgetoplate.model.RecipeModel;
import com.fridgetoplate.model.Review;
import com.fridgetoplate.response.RecipeResponse;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class RecipeRepository {

    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    public RecipeModel save(RecipeModel recipe){
        dynamoDBMapper.save(recipe);
        return recipe;
    }

    public RecipeResponse findById(String id){

        

        /*
         * 
         * Getting the Recipe Response
         */

         // Declaring the Recipe Response object
        RecipeResponse recipeResponse = new RecipeResponse();


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
        List<String> instructions = recipeModel.getInstructions();
        String creator = recipeModel.getCreator();
        Integer servings = recipeModel.getNumberOfServings();
        Integer views = recipeModel.getViews();

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
        recipeResponse.setInstructions(instructions);
        recipeResponse.setCreator(creator);
        recipeResponse.setNumberOfServings(servings);
        recipeResponse.setViews(views);


        /*
         * Getting the Reviews
         */

        // Declaring the Reviews object 
        List<Review> reviews = this.getReviewsById(recipeId);

        // Adding the reviews to the recipe response
        recipeResponse.setReviews(reviews);



       return recipeResponse;
    }

    public List<RecipeResponse> findAll(){
        List<RecipeResponse> recipes = new ArrayList<>();
        
        PaginatedScanList<RecipeModel> scanResult = dynamoDBMapper.scan(RecipeModel.class, new DynamoDBScanExpression());

        for (RecipeModel recipe : scanResult) {
            
            RecipeResponse response = findById(recipe.getRecipeId());
                if(response != null) {
                    recipes.add(response);
                }
        }

        return recipes;
    }

    public RecipeModel update(String id, RecipeModel recipe){

        RecipeModel recipeData =  dynamoDBMapper.load(RecipeModel.class, id);

        

        dynamoDBMapper.save(recipeData,
                new DynamoDBSaveExpression()
        .withExpectedEntry("recipeId",
                new ExpectedAttributeValue(
                        new AttributeValue().withS(id)
                )));
        return recipeData;
    }

    public String delete(String id){
       Recipe person = dynamoDBMapper.load(Recipe.class, id);
        dynamoDBMapper.delete(person);
        return "Recipe deleted successfully:: " + id;
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

    public List<RecipeResponse> getRecipesByUsername(String username) {
        List<RecipeResponse> recipes = new ArrayList<>();
        
        PaginatedScanList<RecipeModel> scanResult = dynamoDBMapper.scan(RecipeModel.class, new DynamoDBScanExpression());

        for (RecipeModel recipe : scanResult) {
            
            if (recipe.getCreator().equals(username)) {
                RecipeResponse response = findById(recipe.getRecipeId());
                if(response != null) {
                    recipes.add(response);
                }

            }
        }

        return recipes;
    }

    
}
