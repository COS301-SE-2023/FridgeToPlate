package com.fridgetoplate.interfaces;
import java.util.List;

import com.fridgetoplate.model.Ingredient;

import lombok.Data;

@Data
public class Profile {

    protected String username;
    
    protected String email;

    protected String displayName;

    protected String profilePicture;

    protected List<Ingredient> ingredients;
    
}