package com.fridgetoplate.utils;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverter;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fridgetoplate.model.Review;

public class ReviewArrayConverter implements DynamoDBTypeConverter<String, Review[]> {
    private static final ObjectMapper mapper = new ObjectMapper();

    @Override
    public String convert(Review[] strings) {
        try {
            return mapper.writeValueAsString(strings);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Review[] unconvert(String json) {
        try {
            return mapper.readValue(json, Review[].class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }


}
