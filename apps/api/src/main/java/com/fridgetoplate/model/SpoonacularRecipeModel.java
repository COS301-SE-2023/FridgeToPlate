package com.fridgetoplate.model;

public class SpoonacularRecipeModel {
    private int id;
    private String title;
    private String image;
    private String imageType;
    private SpoonacularNutritionModel[] nutrition;
    
    public int getId() {
        return id;
    }

    public String getImage() {
        return image;
    }

    public String getImageType() {
        return imageType;
    }

    public SpoonacularNutritionModel[] getNutrition() {
        return nutrition;
    }

    public String getTitle() {
        return title;
    }
}