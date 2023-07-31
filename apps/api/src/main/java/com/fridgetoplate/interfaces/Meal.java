package com.fridgetoplate.interfaces;

public enum Meal {
    Breakfast("Breakfast"),
    Lunch("lunch"),
    Dinner("Dinner"),
    Snack("Snack"),
    Dessert("Dessert");

    public final String mealType;

    private Meal(String meal) {
        this.mealType = meal;
    }
}
