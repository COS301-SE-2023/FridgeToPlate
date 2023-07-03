package com.fridgetoplate.model;


import com.fasterxml.jackson.annotation.JsonProperty;

public class RecipeStep {
    @JsonProperty("instructionHeading")
    private String instructionHeading = "N/A";

    @JsonProperty("instructionBody")
    private String instructionBody;

}
