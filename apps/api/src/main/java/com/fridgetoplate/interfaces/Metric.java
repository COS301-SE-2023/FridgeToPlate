package com.fridgetoplate.interfaces;

import lombok.Data;

@Data
public class Metric {
    private float amount;
    private String unitShort;
    private String unitLong;
}
