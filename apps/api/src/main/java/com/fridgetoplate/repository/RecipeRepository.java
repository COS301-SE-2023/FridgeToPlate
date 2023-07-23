package com.fridgetoplate.repository;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBSaveExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.PaginatedScanList;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ExpectedAttributeValue;
import com.fridgetoplate.frontendmodels.RecipeFrontendModel;
import com.fridgetoplate.frontendmodels.RecipePreferencesFrontendModel;
import com.fridgetoplate.interfaces.Recipe;
import com.fridgetoplate.model.Ingredient;
import com.fridgetoplate.model.RecipeModel;
import com.fridgetoplate.model.Review;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class RecipeRepository {

    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    public RecipeFrontendModel save(RecipeFrontendModel recipe){
        dynamoDBMapper.save(recipe);
        return recipe;
    }
    
    public RecipeFrontendModel[] saveBatch(RecipeFrontendModel[] recipeList){
        dynamoDBMapper.batchSave(recipeList);
        return recipeList;
    }

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

    public List<RecipeFrontendModel> findAllByPreferences(RecipePreferencesFrontendModel recipePreferences){
        
        //Build Expression
        List<RecipeFrontendModel> recipes = new ArrayList<>();
        
        HashMap<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        
        String querySrting = "";

        if(recipePreferences.getDifficulty() != null){
            eav.put(":difficulty", new AttributeValue().withS(recipePreferences.getDifficulty()));
        
            querySrting += "difficulty=:difficulty";
        }

        if(recipePreferences.getMeal() != null){
            eav.put(":meal", new AttributeValue().withS(recipePreferences.getMeal()));

            if(querySrting.length() != 0){
                querySrting += " AND meal=:meal";
            } else {
                querySrting += "meal=:meal";
            }
        }
        
        if(recipePreferences.getRating() != null){
            eav.put(":rating", new AttributeValue().withS(recipePreferences.getRating()));

            if(querySrting.length() != 0){
                querySrting += " AND rating=:rating";
            } else {
                querySrting += "rating=:rating";
            }

        }
        
        if(recipePreferences.getServings() != null){
            eav.put(":servings", new AttributeValue().withS(recipePreferences.getServings()));

            if(querySrting.length() != 0){
                querySrting += " AND servings=:servings";
            } else {
                querySrting += "servings=:servings";
            }            

        }
        
        if(recipePreferences.getPrepTime() != null){
            eav.put(":prepTime", new AttributeValue().withS(recipePreferences.getPrepTime()));

            if(querySrting.length() != 0){
                querySrting += " AND prepTime=:prepTime";
            } else {
                querySrting += "prepTime=:prepTime";
            }

        }
        
        
        String keywordQueryString = "";

        if(recipePreferences.getKeywords() != null && recipePreferences.getKeywords().length != 0){

            String [] keywordArray = recipePreferences.getKeywords();
            
            for(int i = 0; i < keywordArray.length; i++){
                eav.put(":val_" + keywordArray[i],new AttributeValue().withS(keywordArray[i]));
                if(i == 0){
                    keywordQueryString = keywordQueryString + "contains(tags, :val_" + keywordArray[i] + ")";
                }
                else{
                    keywordQueryString = keywordQueryString + " OR contains(tags, :val_" + keywordArray[i] + ")";
                }
            }
        }
        

        if(!keywordQueryString.isBlank()){
            if(querySrting.isEmpty())
                querySrting += keywordQueryString;

            else{
                querySrting += " AND " + keywordQueryString;
            }
        }

        
        //Filter Expression
        DynamoDBScanExpression scanExpression = new DynamoDBScanExpression().withFilterExpression(querySrting).withExpressionAttributeValues(eav);


        PaginatedScanList<RecipeModel> scanResult = dynamoDBMapper.scan(RecipeModel.class, scanExpression);

        for (RecipeModel recipe : scanResult) {
            
            RecipeFrontendModel response = findById(recipe.getRecipeId());
                if(response != null) {
                    recipes.add(response);
                }
        }

        return recipes;
    }

    public RecipeModel update(String id, RecipeModel recipe){

        dynamoDBMapper.save(recipe,
                new DynamoDBSaveExpression()
        .withExpectedEntry("recipeId",
                new ExpectedAttributeValue(
                        new AttributeValue().withS(id)
                )));
        return recipe;
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

    public List<RecipeFrontendModel> getRecipesByUsername(String username) {
        List<RecipeFrontendModel> recipes = new ArrayList<>();
        
        PaginatedScanList<RecipeModel> scanResult = dynamoDBMapper.scan(RecipeModel.class, new DynamoDBScanExpression());

        for (RecipeModel recipe : scanResult) {
            
            if (recipe.getCreator().equals(username)) {
                RecipeFrontendModel response = findById(recipe.getRecipeId());
                if(response != null) {
                    recipes.add(response);
                }

            }
        }

        return recipes;
    }

    
}
