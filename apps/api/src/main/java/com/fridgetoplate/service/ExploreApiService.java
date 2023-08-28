package com.fridgetoplate.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fridgetoplate.frontendmodels.RecipeFrontendModel;
import com.fridgetoplate.interfaces.Explore;
import com.fridgetoplate.model.RecipeModel;
@Service
public class ExploreApiService {

    @Autowired
    private RecipeService recipeService;

    
    public RecipeFrontendModel findById(String id){
       return this.recipeService.findById(id);
    }

    public List<RecipeFrontendModel> findAll() {
        return this.recipeService.findAll();
    }

    public List<RecipeFrontendModel> findBySearch(Explore searchObject){
        List<RecipeModel> recipes = this.recipeService.filterSearch(searchObject);
        return beautify(recipes);
    }

    private List<RecipeFrontendModel> beautify (List<RecipeModel> recipes) {
        List<RecipeFrontendModel> recipeFrontendModels = new ArrayList<RecipeFrontendModel>();
        for (RecipeModel recipeModel : recipes) {
            RecipeFrontendModel frontendModel = this.recipeService.findById(recipeModel.getRecipeId());
            if(!recipeFrontendModels.contains(recipeModel)){
                recipeFrontendModels.add(frontendModel);
            }
        }
      return recipeFrontendModels;
    }

}