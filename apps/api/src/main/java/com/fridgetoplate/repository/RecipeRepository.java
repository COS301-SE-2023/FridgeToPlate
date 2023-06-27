package com.fridgetoplate.repository;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBSaveExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ExpectedAttributeValue;
import com.fridgetoplate.model.Recipe;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class RecipeRepository {

    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    public Recipe save(Recipe recipe){
        dynamoDBMapper.save(recipe);
        return recipe;
    }

    public Recipe findById(String id){
       return dynamoDBMapper.load(Recipe.class, id);
    }

    public List<Recipe> findAll(){
        return dynamoDBMapper.scan(Recipe.class, new DynamoDBScanExpression());
    }

    public Recipe update(String id, Recipe recipe){

        Recipe recipeData =  dynamoDBMapper.load(Recipe.class, id);

        if(recipe.getIngredients() != null) {
            recipeData.setIngredients(recipe.getIngredients());
        }

        if(recipe.getInstructions() != null) {
            recipeData.setInstructions(recipe.getInstructions());
        }

        if(recipe.getName() != null) {
            recipeData.setName(recipe.getName());
        }

        if(recipe.getDifficulty() != null) {
            recipeData.setDifficulty(recipe.getDifficulty());
        }

        if(recipe.getPrepTime() != null) {
            recipeData.setPrepTime(recipe.getPrepTime());
        }

        if(recipe.getNumberOfServings() != null) {
            recipeData.setNumberOfServings(recipe.getNumberOfServings());
        }

        if(recipe.getTags() != null) {
            recipeData.setTags(recipe.getTags());
        }

        if(recipe.getRecipeImage() != null) {
            recipeData.setRecipeImage(recipe.getRecipeImage());
        }


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

    
}
