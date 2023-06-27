package com.fridgetoplate.model;


import com.fasterxml.jackson.annotation.JsonProperty;

public class RecipeStep {
    @JsonProperty("instructionHead")
    private String instructionHead;

    @JsonProperty("instructionBody")
    private String instructionBody;

}
