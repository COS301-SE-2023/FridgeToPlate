package com.fridgetoplate.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.fridgetoplate.repository.ProfileRepository;
import com.fridgetoplate.model.ProfileModel;

@Component
public class NotificationService {
    
    @Autowired
    private ProfileRepository profileRepository;
    
    @Scheduled(fixedRate = 5000)
    public void execute() {
        System.out.println("Code is being run....");
        
        List<ProfileModel> allUsers =  profileRepository.findAllUsers();

        for(int i = 0; i < allUsers.size(); i++){
            System.out.println(allUsers.get(i).getUsername());
        }
    }
}
