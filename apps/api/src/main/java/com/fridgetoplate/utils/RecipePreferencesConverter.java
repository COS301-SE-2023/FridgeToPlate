package com.fridgetoplate.utils;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverter;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fridgetoplate.interfaces.RecipePreferences;

public class RecipePreferencesConverter implements DynamoDBTypeConverter<String, RecipePreferences>{
    private static final ObjectMapper mapper = new ObjectMapper();

    @Override
    public String convert(RecipePreferences strings) {
        try {
            return mapper.writeValueAsString(strings);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public RecipePreferences unconvert(String json) {
        try {
            return mapper.readValue(json, RecipePreferences.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }    
    
}
