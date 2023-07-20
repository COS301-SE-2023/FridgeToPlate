package com.fridgetoplate.model;

public class SpponacularResponseModel {
     private RecipeModel[] results;
     private int offset;
     private int number;
     private int totalResults;

     public RecipeModel[] getResults(){
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
