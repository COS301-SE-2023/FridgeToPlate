// RecipeRepository.java
package com.fridgetoplate.repository;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBSaveExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.PaginatedScanList;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ComparisonOperator;
import com.amazonaws.services.dynamodbv2.model.Condition;
import com.amazonaws.services.dynamodbv2.model.ExpectedAttributeValue;
import com.fridgetoplate.frontendmodels.RecipeFrontendModel;
import com.fridgetoplate.frontendmodels.RecipePreferencesFrontendModel;
import com.fridgetoplate.interfaces.RecipeDesc;
import com.fridgetoplate.model.Ingredient;
import com.fridgetoplate.model.IngredientModel;
import com.fridgetoplate.model.RecipeModel;
import com.fridgetoplate.model.Review;

import graphql.com.google.common.collect.ImmutableMap;

import java.util.ArrayList;
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
    private ReviewRepository reviewRepository;

    public void saveRecipe(RecipeModel recipe){
        dynamoDBMapper.save(recipe);
    }

    public void saveIngredient(IngredientModel ingredient){
            dynamoDBMapper.save(ingredient);
    }

    public RecipeModel findById(String id){
        return dynamoDBMapper.load(RecipeModel.class, id);
    }

    public List<IngredientModel> getIngredientModels(String ingredientName) {
      DynamoDBScanExpression scanExpression = new DynamoDBScanExpression();
        Map<String, Condition> scanFilter = new HashMap<>();

        scanFilter.put("name", new Condition()
                                      .withComparisonOperator(ComparisonOperator.EQ)
                                      .withAttributeValueList(new AttributeValue().withS(ingredientName)));

        scanExpression.setScanFilter(scanFilter);

        List<IngredientModel> scanResult = dynamoDBMapper.parallelScan(IngredientModel.class, scanExpression, 5);

        return scanResult;
    }

    // public RecipeModel update(String id, RecipeModel recipe){

    //     dynamoDBMapper.save(recipe,
    //             new DynamoDBSaveExpression()
    //     .withExpectedEntry("recipeId",
    //             new ExpectedAttributeValue(
    //                     new AttributeValue().withS(id)
    //             )));
    //     return recipe;
    // }

    public String delete(String id){
       RecipeModel recipe = dynamoDBMapper.load(RecipeModel.class, id);
        dynamoDBMapper.delete(recipe);
        return "Recipe deleted successfully:: " + id;
    }

    public List<IngredientModel> findIngredientsByRecipeId(String recipeId){
        DynamoDBQueryExpression<IngredientModel> query = new DynamoDBQueryExpression<IngredientModel>();
            query.setKeyConditionExpression("recipeId = :id");
            query.withExpressionAttributeValues(ImmutableMap.of(":id", new AttributeValue().withS(recipeId)));

        return dynamoDBMapper.query(IngredientModel.class, query);
    }

    public List<Review> getReviewsById(String recipeId) {
        DynamoDBQueryExpression<Review> query = new DynamoDBQueryExpression<Review>();
            query.setKeyConditionExpression("recipeId = :id");
            query.withExpressionAttributeValues(ImmutableMap.of(":id", new AttributeValue().withS(recipeId)));

        return dynamoDBMapper.query(Review.class, query);
    }

    public List<RecipeModel> getCreatedRecipes(String username) {

        DynamoDBScanExpression scanExpression = new DynamoDBScanExpression();
        Map<String, Condition> scanFilter = new HashMap<>();

        scanFilter.put("creator", new Condition()
                                      .withComparisonOperator(ComparisonOperator.EQ)
                                      .withAttributeValueList(new AttributeValue().withS(username)));

        scanExpression.setScanFilter(scanFilter);

        List<RecipeModel> scanResult = dynamoDBMapper.parallelScan(RecipeModel.class, scanExpression, 5);

        return scanResult;
    }

    public List<RecipeModel> getRecipesByRecipeName(String recipeName) {
       DynamoDBScanExpression scanExpression = new DynamoDBScanExpression();
        Map<String, Condition> scanFilter = new HashMap<>();

        scanFilter.put("name", new Condition()
                                      .withComparisonOperator(ComparisonOperator.CONTAINS)
                                      .withAttributeValueList(new AttributeValue().withS(recipeName)));

        scanExpression.setScanFilter(scanFilter);

        List<RecipeModel> scanResult = dynamoDBMapper.parallelScan(RecipeModel.class, scanExpression, 5);

        return scanResult;
    }
  }
