package com.fridgetoplate.interfaces;
import java.util.List;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;

import lombok.Data;

@Data
public class Explore {

    protected String search;

    protected String type;

    protected List<String> tags;

    protected String difficulty;

    public String getSearch() {
        return search;
    }

    public String getType() {
        return type;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public List<String> getTags() {
        return tags;
    }
}
