package com.fridgetoplate.interfaces;

public class Ingredient {
    
    protected String name;

    protected Double amount;

    protected String unit;

    public void setName(String name) {
        this.name = name;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }
}
