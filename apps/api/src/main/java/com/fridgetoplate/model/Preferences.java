package com.fridgetoplate.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import lombok.Data;

@Data
@DynamoDBTable(tableName = "preferences")
public class Preferences {

    @DynamoDBHashKey(attributeName = "username")
    private String username;

    @DynamoDBAttribute(attributeName = "darkMode")
    private boolean darkMode;

    @DynamoDBAttribute(attributeName = "recommendNotif")
    private boolean recommendNotif;

    @DynamoDBAttribute(attributeName = "viewsNotif")
    private boolean viewsNotif;

    @DynamoDBAttribute(attributeName = "reviewsNotif")
    private boolean reviewsNotif;

}
