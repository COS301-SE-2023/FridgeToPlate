package com.fridgetoplate.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.fridgetoplate.service.ProfileService;
import com.fridgetoplate.frontendmodels.ProfileFrontendModel;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE })
@RequestMapping("/profiles")

public class ProfileController {
    @Autowired
    private ProfileService profileService;

    @PostMapping("/create")
    public ProfileFrontendModel save(@RequestBody ProfileFrontendModel profile) {
        return profileService.save(profile);
    }

    @GetMapping("/{username}")
    public ProfileFrontendModel findByName(@PathVariable(value = "username") String username) {
        return profileService.findByName(username);
    }

    @PutMapping("/{username}")
    public ProfileFrontendModel update(@PathVariable(value = "username") String username, @RequestBody ProfileFrontendModel profile) {
        return profileService.update(username, profile);
    }
}
