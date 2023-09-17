package com.fridgetoplate.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fridgetoplate.frontendmodels.NotificationsResponseModel;
import com.fridgetoplate.repository.NotificationsRepository;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.DELETE })
@RequestMapping("/notifications")

public class NotificationController {

    @Autowired
    private NotificationsRepository notificationsRepository;

    @GetMapping("/{userId}")
    public NotificationsResponseModel findAll(@PathVariable(value = "userId") String userId){
        return notificationsRepository.findAll(userId);
    }

    @DeleteMapping("/{notificationId}")
    public String delete(@PathVariable(value = "notificationId") String notificationId){
        return notificationsRepository.delete(notificationId);
    }

    @DeleteMapping("/clear/{userId}")
    public String clearNotifications(@PathVariable(value = "userId") String userId){
        return notificationsRepository.clearNotifications(userId);
    }

    @DeleteMapping("/clear/{userId}/{notificationType}")
    public String clearAllNotificationsOfType(@PathVariable(value = "userId") String userId, @PathVariable(value = "notificationType") String type){
        return notificationsRepository.clearAllNotificationOfType(userId, type);
    }

}
