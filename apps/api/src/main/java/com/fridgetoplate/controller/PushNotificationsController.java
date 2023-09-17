package com.fridgetoplate.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.Message;
import org.springframework.stereotype.Controller;

@Controller
public class PushNotificationsController {
    
    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/push-notifications")
    @SendTo("/all/messages")
    public Message send(final Message message) throws Exception{
        return message;
    }

    @MessageMapping("/private")
    public void sendToSpecificUser(@Payload Message message){
        simpMessagingTemplate.convertAndSendToUser("ToReplaceLater", "/specific", message);
    }
}
