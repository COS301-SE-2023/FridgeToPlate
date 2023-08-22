package com.fridgetoplate.interfaces;

import lombok.Data;

@Data
public class SpoonacularRecipe {
    private boolean vegetarian;
    private boolean vegan;
    private boolean glutenFree;
    private boolean dairyFree;
    private boolean veryHealthy;
    private boolean cheap;
    private boolean veryPopular;
    private boolean sustainable;
    private boolean lowFodmap;
    private int weightWatcherSmartPoints;
    private String gaps;
    private int preparationMinutes;
    private int cookingMinutes;
    private int aggregateLikes;
    private int healthScore;
    private String creditsText;
    private String sourceName;
    private int pricePerServing;
    private int id;
    private String title;
    private int readyInMinutes;
    private int servings;
    private String sourceUrl;
    private String image;
    private String imageType;
    private String summary;
    private String [] cuisines;
    private String [] dishTypes;
    private String [] diets;
    private String [] occasions;
    private SpoonacularAnalyzedInstruction[] analyzedInstructions;
    private String spoonacularSourceUrl;
    private String license;
    private ExtendedIngredient[] extendedIngredients;
}
