package com.fridgetoplate.utils;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverter;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fridgetoplate.interfaces.Recipe;

public class RecipeArrayConverter implements DynamoDBTypeConverter<String, Recipe[]> {
        private static final ObjectMapper mapper = new ObjectMapper();

        @Override
        public String convert(Recipe[] recipes) {
            try {
                return mapper.writeValueAsString(recipes);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
                return null;
            }
        }

        @Override
        public Recipe[] unconvert(String json) {
            try {
                return mapper.readValue(json, Recipe[].class);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
                return null;
            }
        }

       
    }