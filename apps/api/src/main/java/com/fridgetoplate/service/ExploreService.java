package com.fridgetoplate.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fridgetoplate.frontendmodels.RecipeFrontendModel;
import com.fridgetoplate.interfaces.Explore;
import com.fridgetoplate.interfaces.RecipeDesc;
import com.fridgetoplate.model.RecipeModel;
@Service
public class ExploreService {

    @Autowired
    private RecipeService recipeService;
    
    public RecipeFrontendModel findById(String id){
       return this.recipeService.findById(id);
    }

    public List<RecipeDesc> findBySearch(Explore searchObject){
        List<RecipeModel> recipes = this.recipeService.filterSearch(searchObject);
        return beautify(new ArrayList<>(recipes));
    }

    private List<RecipeDesc> beautify (List<RecipeModel> recipes) {
        List<RecipeDesc> recipeFrontendModels = new ArrayList<RecipeDesc>();
        Collections.shuffle(recipes);
        for (int i = 0; i < 24 && i < recipes.size(); i++) {
            RecipeFrontendModel frontendModel = this.recipeService.findById(recipes.get(i).getRecipeId());
            if(!recipeFrontendModels.contains(frontendModel)){
                RecipeDesc recipeDesc = new RecipeDesc();
                recipeDesc.setRecipeId(frontendModel.getRecipeId());
                recipeDesc.setName(frontendModel.getName());
                recipeDesc.setRecipeImage(frontendModel.getRecipeImage());
                recipeDesc.setTags(frontendModel.getTags());
                recipeDesc.setDifficulty(frontendModel.getDifficulty());
                recipeDesc.setRating(frontendModel.getRating());
                recipeFrontendModels.add(recipeDesc);
            }
        }

        return recipeFrontendModels;
    }

}
