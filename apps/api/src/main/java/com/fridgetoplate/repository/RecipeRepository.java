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

    public String update(String id, Recipe person){
        dynamoDBMapper.save(person,
                new DynamoDBSaveExpression()
        .withExpectedEntry("id",
                new ExpectedAttributeValue(
                        new AttributeValue().withS(id)
                )));
        return id;
    }

    public String delete(String id){
       Recipe person = dynamoDBMapper.load(Recipe.class, id);
        dynamoDBMapper.delete(person);
        return "Person deleted successfully:: "+id;
    }
}
