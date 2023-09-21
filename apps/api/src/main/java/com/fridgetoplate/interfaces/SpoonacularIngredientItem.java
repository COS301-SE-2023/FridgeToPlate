package com.fridgetoplate.interfaces;

import lombok.Data;

@Data
public class SpoonacularIngredientItem {
    
    String id;
    String title;
    String image;
    Integer usedIngredientCount;
    Integer missedIngredientCount;
    SpoonacularIngredient[] missedIngredients;   
    SpoonacularIngredient[] usedIngredients;
    SpoonacularIngredient[] unusedIngredients;
    Integer likes;

}
