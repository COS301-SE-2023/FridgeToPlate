package com.fridgetoplate.interfaces;
import java.util.List;
import lombok.Data;

@Data
public class Explore {

    protected String search;

    protected List<String> tags;

    protected String difficulty;
}

