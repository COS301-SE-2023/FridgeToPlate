package com.fridgetoplate.interfaces;

import lombok.Data;

@Data
public class Notification {
    protected String recipeId;

    protected String userName;

    protected String profilePictureUrl;

    protected String comment;

    protected String notificationType;
}
