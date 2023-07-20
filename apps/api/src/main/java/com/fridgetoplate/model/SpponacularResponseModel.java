package com.fridgetoplate.model;

public class SpponacularResponseModel {
     private SpoonacularRecipeModel[] results;
     private int offset;
     private int number;
     private int totalResults;

     public SpoonacularRecipeModel[] getResults(){
        return results;
     }

     public int getOffset(){
        return offset;
     }

     public int getNumber(){
        return number;
     }

     public int getTotalresults(){
        return totalResults;
     }

}
