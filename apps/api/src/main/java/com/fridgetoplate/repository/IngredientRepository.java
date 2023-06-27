package com.fridgetoplate.repository;
import java.util.Arrays;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBSaveExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ExpectedAttributeValue;
import com.fridgetoplate.model.Ingredient;

@Repository
public class IngredientRepository {
    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    public Ingredient save(Ingredient ingredient){
        dynamoDBMapper.save(ingredient);
        return ingredient;
    }

    public Ingredient[] saveAll(Ingredient[] ingredients){
        for(Ingredient ingredient : ingredients)
        {
            dynamoDBMapper.save(ingredient);
        }
        return ingredients;
    }

    public Ingredient findById(String id){
       return dynamoDBMapper.load(Ingredient.class, id);
    }

    public List<Ingredient> findAll(){
        return dynamoDBMapper.scan(Ingredient.class, new DynamoDBScanExpression());
    }

    public Ingredient update(String id, Ingredient ingredient){

        Ingredient ingredientData =  dynamoDBMapper.load(Ingredient.class, id);

        System.out.println(ingredientData);

        if(ingredientData == null)
            return null;


        if(ingredient.getName() != null) {
            ingredientData.setName(ingredient.getName());
        }

        dynamoDBMapper.save(ingredientData,
                new DynamoDBSaveExpression()
        .withExpectedEntry("ingredientId",
                new ExpectedAttributeValue(
                        new AttributeValue().withS(id)
                )));
        return ingredientData;
    }

    public String delete(String id){
       Ingredient ingredient = dynamoDBMapper.load(Ingredient.class, id);
        dynamoDBMapper.delete(ingredient);
        return "Profile deleted successfully:: " + id;
    }
}
