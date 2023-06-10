package com.fridgetoplate.model;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAutoGeneratedKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import lombok.Data;

@Data
@DynamoDBTable(tableName = "profiles")
public class Profile {
    @DynamoDBHashKey
    @DynamoDBAutoGeneratedKey
    private String profileId;
    
    @DynamoDBAttribute
    private String username;

    @DynamoDBAttribute
    private String profilePicture;

    @DynamoDBAttribute
    private Ingredient[] ingredients;

    @DynamoDBAttribute
    private Recipe[] preferences;

    @DynamoDBAttribute
    private Recipe[] create_recipes;
}
