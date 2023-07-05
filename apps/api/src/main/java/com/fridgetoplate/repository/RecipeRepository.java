package com.fridgetoplate.repository;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBSaveExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ExpectedAttributeValue;
import com.fridgetoplate.interfaces.Recipe;

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
