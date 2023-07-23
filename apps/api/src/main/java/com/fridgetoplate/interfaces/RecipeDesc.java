package com.fridgetoplate.interfaces;

import java.util.List;
import lombok.Data;

@Data
public class RecipeDesc {

    protected String recipeId;

    protected String recipeImage;

    protected String name;

    protected List<String> tags;

    protected String difficulty;
}
