package com.fridgetoplate.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverted;
import com.fridgetoplate.interfaces.Profile;
import com.fridgetoplate.utils.StringArrayConverter;


@DynamoDBTable(tableName = "profiles")
public class ProfileModel extends Profile {
    
    @DynamoDBAttribute
    @DynamoDBTypeConverted(converter = StringArrayConverter.class)
    private String[] savedRecipes;
}
