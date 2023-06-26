package com.fridgetoplate.utils;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverter;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class StringArrayConverter implements DynamoDBTypeConverter<String, String[]> {
    private static final ObjectMapper mapper = new ObjectMapper();

    @Override
    public String convert(String[] strings) {
        try {
            return mapper.writeValueAsString(strings);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public String[] unconvert(String json) {
        try {
            return mapper.readValue(json, String[].class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }
}