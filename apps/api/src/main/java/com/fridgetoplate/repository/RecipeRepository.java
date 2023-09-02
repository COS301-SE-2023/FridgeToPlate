package com.fridgetoplate.repository;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBSaveExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.PaginatedScanList;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.Condition;
import com.amazonaws.services.dynamodbv2.model.ExpectedAttributeValue;
import com.fridgetoplate.frontendmodels.RecipeFrontendModel;
import com.fridgetoplate.frontendmodels.RecipePreferencesFrontendModel;
import com.fridgetoplate.interfaces.Explore;
import com.fridgetoplate.interfaces.RecipeDesc;
import com.fridgetoplate.model.Ingredient;
import com.fridgetoplate.model.IngredientModel;
import com.fridgetoplate.model.RecipeModel;
import com.fridgetoplate.model.Review;
import com.fridgetoplate.service.RecipeService;

import graphql.com.google.common.collect.ImmutableMap;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class RecipeRepository {

    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    @Autowired
    RecipeService recipeService;

    @Autowired
    private ReviewRepository reviewRepository;

    public RecipeFrontendModel save(RecipeFrontendModel recipe){
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
        dynamoDBMapper.save(model);

        recipe.setRecipeId(model.getRecipeId());

        for (Ingredient ingredient : recipe.getIngredients()) {
            IngredientModel ingredientModel = new IngredientModel();
            ingredientModel.setRecipeId(recipe.getRecipeId());
            ingredientModel.setName(ingredient.getName());
            ingredientModel.setAmount(ingredient.getAmount());
            ingredientModel.setUnit(ingredient.getUnit());
            
            dynamoDBMapper.save(ingredientModel);
        }
        return recipe;
    }
    
    public void saveBatch(RecipeModel[] recipeList){
        if(recipeList.length != 0)
        {
            for(int i = 0; i < recipeList.length; i++){
                dynamoDBMapper.save(recipeList[i]);
            }
        }
    }

    public RecipeModel findById(String id){
        return dynamoDBMapper.load(RecipeModel.class, id);
    }

    public List<IngredientModel> findIngredientsByRecipeId(String recipeId){
        DynamoDBQueryExpression<IngredientModel> query = new DynamoDBQueryExpression<IngredientModel>();
            query.setKeyConditionExpression("recipeId = :id");
            query.withExpressionAttributeValues(ImmutableMap.of(":id", new AttributeValue().withS(recipeId)));

        return dynamoDBMapper.query(IngredientModel.class, query);
    }

    public List<RecipeFrontendModel> findAllByPreferences(RecipePreferencesFrontendModel recipePreferences, List<Ingredient> userIngredients){
        
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
                String keywordString = keywordArray[i].replace("\s", keywordQueryString).strip();

                eav.put(":val_" + keywordString,new AttributeValue().withS(keywordString));
                if(i == 0){
                    keywordQueryString = keywordQueryString + "contains(tags, :val_" + keywordString + ")";
                }
                else{
                    keywordQueryString = keywordQueryString + " OR contains(tags, :val_" + keywordString + ")";
                }
            }
        }

        String ingredientQueryString = "";

        if(userIngredients != null && userIngredients.size() != 0){
            
            for(int i = 0; i < userIngredients.size(); i++){
                String ingredientName = userIngredients.get(i).getName().strip().split(",")[0].replace("\s", "");

                eav.put(":val_" + ingredientName , new AttributeValue().withS(ingredientName));
                if(i == 0){
                    keywordQueryString = keywordQueryString + "contains(ingredients, :val_" + ingredientName + ")";
                }
                else{
                    keywordQueryString = keywordQueryString + " OR contains(ingredients, :val_" + ingredientName + ")";
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

        if(!ingredientQueryString.isBlank()){
            if(querySrting.isEmpty())
                querySrting += ingredientQueryString;

            else{
                querySrting += " AND " + ingredientQueryString;
            }
        }

        //Filter Expression
        DynamoDBScanExpression scanExpression = new DynamoDBScanExpression().withFilterExpression(querySrting).withExpressionAttributeValues(eav);


        PaginatedScanList<RecipeModel> scanResult = dynamoDBMapper.scan(RecipeModel.class, scanExpression);

        for (RecipeModel recipe : scanResult) {
            
            RecipeFrontendModel response = this.findByIdTEMP(recipe.getRecipeId());
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
       RecipeModel recipe = dynamoDBMapper.load(RecipeModel.class, id);
        dynamoDBMapper.delete(recipe);
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
                RecipeFrontendModel response = this.findByIdTEMP(recipe.getRecipeId());
                if(response != null) {
                    recipes.add(response);
                }

            }
        }

        return recipes;
    }

    public List<RecipeFrontendModel> getRecipesByRecipename(String recipename) {
        List<RecipeFrontendModel> recipes = new ArrayList<>();
        
        PaginatedScanList<RecipeModel> scanResult = dynamoDBMapper.scan(RecipeModel.class, new DynamoDBScanExpression());

        for (RecipeModel recipe : scanResult) {
            
            if (recipe.getName().equals(recipename)) {
                RecipeFrontendModel response = this.findByIdTEMP(recipe.getRecipeId());
                if(response != null) {
                    recipes.add(response);
                }

            }
        }

        return recipes;
    }

    public List<RecipeDesc> getCreatedRecipes(String username) {
        List<RecipeDesc> recipes = new ArrayList<>();
        PaginatedScanList<RecipeModel> scanResult = dynamoDBMapper.scan(RecipeModel.class, new DynamoDBScanExpression());


        for (RecipeModel recipeModel : scanResult) {
            if (recipeModel.getCreator().equals(username)) {
                RecipeDesc recipeDesc = new RecipeDesc();
                recipeDesc.setRecipeId(recipeModel.getRecipeId());
                recipeDesc.setName(recipeModel.getName());
                recipeDesc.setRecipeImage(recipeModel.getRecipeImage());
                recipeDesc.setTags(recipeModel.getTags());
                recipeDesc.setDifficulty(recipeModel.getDifficulty()); 
                recipes.add(recipeDesc);
            }
        }


        return recipes;
    }

    public List<RecipeDesc> getSavedRecipes(List<String> ids) {


        List<RecipeDesc> recipes = new ArrayList<>();

        if(ids == null || ids.isEmpty()) {
            return recipes;
        }

        PaginatedScanList<RecipeModel> scanResult = dynamoDBMapper.scan(RecipeModel.class, new DynamoDBScanExpression());

        for (String id : ids) {
            for (RecipeModel recipeModel : scanResult) {
                if (recipeModel.getRecipeId().equals(id)) {
                    RecipeDesc recipeDesc = new RecipeDesc();
                    recipeDesc.setRecipeId(recipeModel.getRecipeId());
                    recipeDesc.setName(recipeModel.getName());
                    recipeDesc.setRecipeImage(recipeModel.getRecipeImage());
                    recipeDesc.setTags(recipeModel.getTags());
                    recipeDesc.setDifficulty(recipeModel.getDifficulty()); 
                    recipes.add(recipeDesc);
                }
            }
        }

        return recipes;
    }

    public RecipeFrontendModel findByIdTEMP(String id){

        /*
         * Getting the Recipe Response
         */

         // Declaring the Recipe Response object
        RecipeFrontendModel recipeResponse = new RecipeFrontendModel();


        // Find the Recipe model
        RecipeModel recipeModel = this.findById(id);

        if(recipeModel == null) {
            return null;
        }

        // Get ingredients for Recipe
        List<IngredientModel> ingredientsModel = this.findIngredientsByRecipeId(id);

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


    public List<RecipeModel> allRecipeModels(){
        PaginatedScanList<RecipeModel> scanResult = dynamoDBMapper.scan(RecipeModel.class, new DynamoDBScanExpression());
        return(List<RecipeModel>) scanResult;
    }

    public List<RecipeModel> filterSearch(Explore explore){
       
        Map<String, Condition> scanFilter = new HashMap<>();

        if(explore.getType() != null && !explore.getTags().isEmpty()){
            Condition condition = new Condition()
                .withComparisonOperator("EQ")
                .withAttributeValueList(new AttributeValue().withS(explore.getType()));

            scanFilter.put("meal", condition);
        }

        if (explore.getTags() != null && !explore.getTags().isEmpty()) {
            List<AttributeValue> attributeValues = explore.getTags().stream()
                .map(tag -> new AttributeValue().withS(tag))
                .toList();
        
            Condition condition = new Condition()
                .withComparisonOperator("CONTAINS")
                .withAttributeValueList(attributeValues);
        
            scanFilter.put("tags", condition);
        }

        if(explore.getDifficulty() != null && !explore.getDifficulty().isEmpty()){
            Condition condition = new Condition()
                .withComparisonOperator("EQ")
                .withAttributeValueList(new AttributeValue().withS(explore.getDifficulty()));

            scanFilter.put("difficulty", condition);
        }


        List<RecipeModel> results = dynamoDBMapper.scan(RecipeModel.class, new DynamoDBScanExpression().withScanFilter(scanFilter));
        return results;

    }
}
