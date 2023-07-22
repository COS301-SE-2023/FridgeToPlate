package com.fridgetoplate.interfaces;

import lombok.Data;

@Data
public class SpoonacularAnalyzedInstruction {
    private String name;
    private SpoonacularStep[] steps;
}
