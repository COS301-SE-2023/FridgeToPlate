package com.fridgetoplate.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.Message;
import org.springframework.stereotype.Controller;
import org.springframework.messaging.simp.SimpMessagingTemplate;
@Controller
public class PushNotificationsController {

    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;

//    @Autowired
//    PushNotificationsController(SimpMessagingTemplate template){
//        this.simpMessagingTemplate = template;
//    }

  //Mapped as app/application
    @MessageMapping("/application")
    @SendTo("/all/messages")
    public Message<String> send(final Message<String> message) throws Exception{
        System.out.println("Message: " + message);

        return message;
    }

    // app/private
    @MessageMapping("/private")
    public void sendToSpecificUser(@Payload Message<String> message){
        simpMessagingTemplate.convertAndSendToUser("ToReplaceLater", "/specific", message);
    }


}
