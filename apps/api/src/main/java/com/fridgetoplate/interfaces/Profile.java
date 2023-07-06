package com.fridgetoplate.interfaces;
import java.util.List;

import com.fridgetoplate.model.Ingredient;
import com.fridgetoplate.model.Preference;

import lombok.Data;

@Data
public class Profile {

    protected String profileId;

    protected String username;
    
    protected String email;

    protected String displayName;

    protected String profilePicture;

    protected List<Ingredient> ingredients;

    protected Preference preferences;
    
}