package com.fridgetoplate.interfaces;

import java.util.List;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBDocument;
import lombok.Data;

@Data
@DynamoDBDocument
public class RecipeDesc {

    protected String recipeId;

    protected String recipeImage;

    protected String name;

    protected List<String> tags;

    protected String difficulty;

    protected Double rating;
}
