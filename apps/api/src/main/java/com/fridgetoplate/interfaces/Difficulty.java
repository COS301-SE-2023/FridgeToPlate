package com.fridgetoplate.interfaces;

public enum Difficulty {
    Easy("Easy"),
    Medium("Medium"),
    Hard("Hard");

    public final String difficulty;

    private Difficulty(String label) {
        this.difficulty = label;
    }
}
