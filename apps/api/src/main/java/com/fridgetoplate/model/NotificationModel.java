package com.fridgetoplate.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAutoGeneratedKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

import lombok.Data;

@Data
@DynamoDBTable(tableName = "notifications")
public class NotificationModel {
    
    String notificationId;
    String userId;
    String notificationPic;
    String title;
    String body;
    String type;
    String metadata;

    @DynamoDBAttribute(attributeName = "userId")
    public String getUserId(){
        return userId;
    }

    @DynamoDBHashKey(attributeName = "notificationId")
    @DynamoDBAutoGeneratedKey
    public String getNotificationId() {
        return notificationId;
    }    

    @DynamoDBAttribute(attributeName = "notificationPic")
    public String getNotificationPic(){
        return notificationPic;
    }

    @DynamoDBAttribute(attributeName = "title")
    public String getTitle(){
        return title;
    }

    @DynamoDBAttribute(attributeName = "body")
    public String getBody(){
        return body;
    }

    @DynamoDBAttribute(attributeName = "type")
    public String getType(){
        return type;
    }

    @DynamoDBAttribute(attributeName = "metadata")
    public String getMetaData(){
        return metadata;
    }
}
