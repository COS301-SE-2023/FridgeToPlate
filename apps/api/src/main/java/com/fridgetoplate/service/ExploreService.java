package com.fridgetoplate.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fridgetoplate.frontendmodels.RecipeFrontendModel;
import com.fridgetoplate.interfaces.Explore;
import com.fridgetoplate.interfaces.RecipeDesc;

@Service
public class ExploreService {

    @Autowired
    private RecipeService recipeService;

    public RecipeFrontendModel findById(String id) {
        return this.recipeService.findById(id);
    }

    public List<RecipeDesc> findBySearch(Explore searchObject) {
        return this.recipeService.filterSearch(searchObject);
    }

}
