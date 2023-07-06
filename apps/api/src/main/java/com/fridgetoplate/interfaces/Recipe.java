package com.fridgetoplate.interfaces;

import java.util.List;
import com.fridgetoplate.model.Ingredient;

public class Recipe extends RecipeDesc {

    protected String description;

    protected String recipeImage;

    protected String meal;

    protected Integer prepTime;

    protected Integer numberOfServings;

    protected List<Ingredient> ingredients;

    protected List<String> instructions;

    protected String creator;

}
