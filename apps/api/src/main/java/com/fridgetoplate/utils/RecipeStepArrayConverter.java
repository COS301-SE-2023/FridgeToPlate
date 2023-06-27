package com.fridgetoplate.utils;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverter;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fridgetoplate.model.RecipeStep;

public class RecipeStepArrayConverter implements DynamoDBTypeConverter<String, RecipeStep[]> {
        private static final ObjectMapper mapper = new ObjectMapper();

        @Override
        public String convert(RecipeStep[] recipes) {
            try {
                return mapper.writeValueAsString(recipes);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
                return null;
            }
        }

        @Override
        public RecipeStep[] unconvert(String json) {
            try {
                return mapper.readValue(json, RecipeStep[].class);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
                return null;
            }
        }

       
    }
