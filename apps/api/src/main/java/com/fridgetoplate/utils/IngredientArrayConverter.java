package com.fridgetoplate.utils;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverter;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fridgetoplate.model.Ingredient;

public class IngredientArrayConverter implements DynamoDBTypeConverter<String, Ingredient[]> {
        private static final ObjectMapper mapper = new ObjectMapper();

        @Override
        public String convert(Ingredient[] ingredients) {
            try {
                return mapper.writeValueAsString(ingredients);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
                return null;
            }
        }

        @Override
        public Ingredient[] unconvert(String json) {
            try {
                return mapper.readValue(json, Ingredient[].class);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
                return null;
            }
        }
    }


