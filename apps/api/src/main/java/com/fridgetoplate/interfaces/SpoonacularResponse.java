package com.fridgetoplate.interfaces;

import lombok.Data;

@Data
public class SpoonacularResponse {
    private SpoonacularRecipe[] results;
    private int offset;
    private int number;
    private int totalResults;
}
