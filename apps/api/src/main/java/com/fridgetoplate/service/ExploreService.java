package com.fridgetoplate.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fridgetoplate.frontendmodels.RecipeFrontendModel;
import com.fridgetoplate.interfaces.Explore;
import com.fridgetoplate.model.RecipeModel;
@Service
public class ExploreService {

    @Autowired
    private RecipeService recipeService;

    
    public RecipeFrontendModel findById(String id){
       return this.recipeService.findById(id);
    }

    public List<RecipeFrontendModel> findBySearch(Explore searchObject){
        List<RecipeModel> recipes = this.recipeService.filterSearch(searchObject);
        return beautify(recipes);
    }

    private List<RecipeFrontendModel> beautify (List<RecipeModel> recipes) {
        List<RecipeFrontendModel> recipeFrontendModels = new ArrayList<RecipeFrontendModel>();
        for (int i = 0; i < 25 && i < recipes.size(); i++) {
            RecipeFrontendModel frontendModel = this.recipeService.findById(recipes.get(i).getRecipeId());
            if(!recipeFrontendModels.contains(frontendModel)){
                recipeFrontendModels.add(frontendModel);
            }
        }

        return recipeFrontendModels;
    }

}
