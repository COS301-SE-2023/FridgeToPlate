package com.fridgetoplate.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.fridgetoplate.repository.ProfileRepository;
import com.fridgetoplate.frontendmodels.ProfileFrontendModel;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE })
@RequestMapping("/profiles")

public class ProfileController {
    @Autowired
    private ProfileRepository profileRepository;

    @PostMapping("/create")
    public ProfileFrontendModel save(@RequestBody ProfileFrontendModel profile) {
        return profileRepository.save(profile);
    }

    @GetMapping("/{username}")
    public ProfileFrontendModel findByName(@PathVariable(value = "username") String username) {
        return profileRepository.findByName(username);
    }

    @GetMapping
    public List<ProfileFrontendModel> findAll() {
        return profileRepository.findAll();
    }

    @PutMapping("/{username}")
    public ProfileFrontendModel update(@PathVariable(value = "username") String username, @RequestBody ProfileFrontendModel profile) {
        return profileRepository.update(username, profile);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable(value = "id") String id) {
        return profileRepository.delete(id);
    }
}
