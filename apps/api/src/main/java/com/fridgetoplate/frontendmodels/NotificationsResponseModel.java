package com.fridgetoplate.frontendmodels;

import java.util.List;

import com.fridgetoplate.model.NotificationModel;

import lombok.Data;

@Data
public class NotificationsResponseModel {
    private List<NotificationModel> general;

    private List<NotificationModel> recommendations;
}
