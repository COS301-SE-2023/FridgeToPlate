package com.fridgetoplate.service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.security.Security;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.jose4j.lang.JoseException;
import org.springframework.scheduling.annotation.Scheduled;

import jakarta.annotation.PostConstruct;
import nl.martijndwars.webpush.Notification;
import nl.martijndwars.webpush.PushService;
import nl.martijndwars.webpush.Subscription;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import org.apache.logging.log4j.message.Message;

public class MessageService {
  @Value("${Vapid.VAPIDPublicKey}")
 private String vapidPublicKey;

 @Value("${Vapid.VAPIDPrivateKey}")
 private String vapidPrivateKey;

 private PushService pushService;

 private List<Subscription> subscriptions = new ArrayList<>();

 @PostConstruct
 private void init() throws GeneralSecurityException {
    Security.addProvider(new BouncyCastleProvider());
    pushService = new PushService(vapidPublicKey, vapidPrivateKey);
 }

 public String getPublicKey(){
    return this.vapidPublicKey;
 }

 public void subscribe(Subscription sub){
    System.out.println("Subscribed to " + sub.endpoint);
    this.subscriptions.add(sub);
 }

 public void unsubscribe(String endpoint) {
    System.out.println("Unsubscribed from " + endpoint);
    subscriptions = subscriptions.stream().filter(s -> !endpoint.equals(s.endpoint))
        .collect(Collectors.toList());
  }

  public void sendNotification(Subscription subscription, String messageJson) {
    try {
      pushService.send(new Notification(subscription, messageJson));
    } catch (GeneralSecurityException |IOException | JoseException | ExecutionException | InterruptedException e) {
      e.printStackTrace();
    }
  }

  @Scheduled(fixedRate = 15000)
  private void sendNotifications() {
    System.out.println("Sending notifications to all subscribers");

    var json = """
        {
          "title": "Server says hello!",
          "body": "It is now: %s"
        }
        """;

    subscriptions.forEach(subscription -> {
      sendNotification(subscription, String.format(json, LocalTime.now()));
    });
  }
}
