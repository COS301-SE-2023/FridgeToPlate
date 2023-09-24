// RecipeRepository.java
package com.fridgetoplate.repository;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.KeyPair;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ComparisonOperator;
import com.amazonaws.services.dynamodbv2.model.Condition;
import com.fridgetoplate.interfaces.Explore;
import com.fridgetoplate.model.IngredientModel;
import com.fridgetoplate.model.RecipeModel;

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

    public void saveRecipe(RecipeModel recipe) {
        dynamoDBMapper.save(recipe);
    }

    public void saveIngredient(IngredientModel ingredient) {
        dynamoDBMapper.save(ingredient);
    }

    public RecipeModel findById(String id) {
        return dynamoDBMapper.load(RecipeModel.class, id);
    }

    public List<IngredientModel> getIngredientModels(String ingredientName) {
        DynamoDBScanExpression scanExpression = new DynamoDBScanExpression();
        Map<String, Condition> scanFilter = new HashMap<>();

        scanFilter.put("name", new Condition()
                .withComparisonOperator(ComparisonOperator.CONTAINS)
                .withAttributeValueList(new AttributeValue().withS(ingredientName)));

        scanExpression.setScanFilter(scanFilter);

        List<IngredientModel> scanResult = dynamoDBMapper.parallelScan(IngredientModel.class, scanExpression, 5);

        return scanResult;
    }

    public void removeIngredients(List<IngredientModel> ingredientModels) {
        dynamoDBMapper.batchDelete(ingredientModels);
    }

    public void deleteRecipe(RecipeModel recipe) {
        dynamoDBMapper.delete(recipe);
    }

    public List<IngredientModel> findIngredientsByRecipeId(String recipeId) {
        DynamoDBQueryExpression<IngredientModel> query = new DynamoDBQueryExpression<IngredientModel>();
        query.setKeyConditionExpression("recipeId = :id");
        query.withExpressionAttributeValues(ImmutableMap.of(":id", new AttributeValue().withS(recipeId)));

        return dynamoDBMapper.query(IngredientModel.class, query);
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

    public List<Object> filterSearch(Explore explore) {

        int numberOfWorkers = 3;
        String search = explore.getSearch();
        String type = explore.getType();
        List<String> tags = explore.getTags();
        String difficulty = explore.getDifficulty();

        DynamoDBScanExpression scanExpression = new DynamoDBScanExpression();

        Map<String, Condition> scanFilter = new HashMap<>();

        if (search != null && !search.isEmpty()) {
            // Add the condition for 'meal'
            Condition condition = new Condition()
                    .withComparisonOperator(ComparisonOperator.CONTAINS)
                    .withAttributeValueList(new AttributeValue().withS(search));
            scanFilter.put("name", condition);
        }

        if (type != null && !type.isEmpty()) {
            // Add the condition for 'meal'
            Condition condition = new Condition()
                    .withComparisonOperator(ComparisonOperator.CONTAINS)
                    .withAttributeValueList(new AttributeValue().withS(type));
            scanFilter.put("meal", condition);
        }

        if (tags != null && !tags.isEmpty()) {
            // Add the condition for 'tags'
            List<AttributeValue> attributeValues = tags.stream()
                    .map(tag -> new AttributeValue().withS(tag))
                    .toList();
            Condition condition = new Condition()
                    .withComparisonOperator(ComparisonOperator.CONTAINS)
                    .withAttributeValueList(attributeValues);
            scanFilter.put("tags", condition);
        }

        if (difficulty != null && !difficulty.isEmpty()) {
            Condition condition = new Condition()
                    .withComparisonOperator(ComparisonOperator.EQ)
                    .withAttributeValueList(new AttributeValue().withS(difficulty));
            scanFilter.put("difficulty", condition);
        }

        if (!scanFilter.isEmpty()) {
            scanExpression.setScanFilter(scanFilter);
        }

        List<RecipeModel> results = dynamoDBMapper.parallelScan(RecipeModel.class, scanExpression, numberOfWorkers);

        return loadBatch(results);

    }

    private List<Object> loadBatch(List<RecipeModel> recipes) {
        List<KeyPair> keyPairList = new ArrayList<>();

        for (RecipeModel recipe : recipes) {
            keyPairList.add(new KeyPair().withHashKey(recipe.getRecipeId()));
        }

        Map<Class<?>, List<KeyPair>> keyPairForTable = new HashMap<>();
        keyPairForTable.put(RecipeModel.class, keyPairList);

        Map<String, List<Object>> models = dynamoDBMapper.batchLoad(keyPairForTable);
        if (models.size() == 0 || models.get("recipes") == null) {
            return new ArrayList<>();
        }

        List<Object> recipeModels = models.get("recipes");
        if (recipeModels.size() > 24) {
            Collections.shuffle(recipeModels);
            return recipeModels.subList(0, 24);
        } else {
            return recipeModels;
        }
    }

}
