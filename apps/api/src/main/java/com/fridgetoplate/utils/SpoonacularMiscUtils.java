package com.fridgetoplate.utils;

import java.util.ArrayList;
import java.util.List;

import com.fridgetoplate.model.Ingredient;

public class SpoonacularMiscUtils {
    
    public String estimateRecipeDifficulty(int recipePrepTime, List<Ingredient> ingredients){

        if(recipePrepTime <= 0 || ingredients == null ) 
            return "Easy";
        
        else{
            if( (recipePrepTime > 0 && recipePrepTime <= 30) && ( ingredients.size() > 0 && ingredients.size() <= 5) )
                return "Easy";
            
            else if( (recipePrepTime > 30 && recipePrepTime <= 60) && ( ingredients.size() > 5 && ingredients.size() <= 10) )
                return "Medium";            
            
            else
                return "Hard";
        }
    }

    public List<String> generateRecipeTags(String[] cuisineList, String[] dishTypeList, String[] dietList){
        if(cuisineList == null || dishTypeList == null || dietList == null){
            return new ArrayList<String>();
        }
        
        else {
            List<String> tagList = new ArrayList<String>();

            //1. Add Cuisines
            if(cuisineList.length > 2 ){
        
                for(int i = 0; i < 2; i++){
        
                    tagList.add(cuisineList[i]);
        
                }
            } 
            
            else{
            
                for(int i = 0; i < cuisineList.length; i++){
        
                    tagList.add(cuisineList[i]);
        
                }
            }

            //2. Add Dish Types
            if(dishTypeList.length > 2 ){
        
                for(int i = 0; i < 2; i++){
        
                    tagList.add(dishTypeList[i]);
        
                }
            } 
            
            else{
            
                for(int i = 0; i < dishTypeList.length; i++){
        
                    tagList.add(dishTypeList[i]);
        
                }
            }

            //3. Add Diet List
            if(dietList.length > 2 ){
        
                for(int i = 0; i < 2; i++){
        
                    tagList.add(dietList[i]);
        
                }
            } 
            
            else{
            
                for(int i = 0; i < dietList.length; i++){
        
                    tagList.add(dietList[i]);
        
                }
            }

            return tagList;

        }

    }
}
