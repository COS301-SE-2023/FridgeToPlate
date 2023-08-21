package com.fridgetoplate.interfaces;

import lombok.Data;

@Data
public class ExtendedIngredient {
    
        private int id;
        private String aisle;
        private String image;
        private String consistency;
        private String name;
        private String nameClean;
        private String original;
        private String originalName;
        private float amount;
        private String unit;
        private String[] meta;
        private Measures measures;

}
