package com.fridgetoplate.utils;

import java.util.ArrayList;
import java.util.List;

import com.fridgetoplate.interfaces.SpoonacularIngredient;

public class SpoonacularMiscUtils {
    
    public String estimateRecipeDifficulty(int recipePrepTime, SpoonacularIngredient[] ingredients){

        if(recipePrepTime == 0 || ingredients == null ) 
            return "Easy";
        
        else{
            if( (recipePrepTime > 0 && recipePrepTime <= 15) && ( ingredients.length > 0 && ingredients.length <= 5) )
                return "Easy";
            
            else if( (recipePrepTime > 15 && recipePrepTime <= 30) && ( ingredients.length > 5 && ingredients.length <= 10) )
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
