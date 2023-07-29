package com.fridgetoplate.interfaces;

import lombok.Data;

@Data
public class SpoonacularIngredient {
    private int id;
    private String name;
    private String localizedName;
    private String image;    
}