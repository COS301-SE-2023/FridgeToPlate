package com.fridgetoplate.interfaces;

import lombok.Data;

@Data
public class SpoonacularVideoResponse {
    public SpoonacularVideo[] videos;
    public int totalResults;
}
