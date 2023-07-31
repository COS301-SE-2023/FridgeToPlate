package com.fridgetoplate.interfaces;

import lombok.Data;

@Data
public class SpoonacularStep {
    private int number;
    private String step;
    private SpoonacularIngredient[] ingredients;
    private SpoonacularEquipment[] equipment;
    private SpoonacularLength length;
}
