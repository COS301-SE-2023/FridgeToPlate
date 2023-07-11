package com.fridgetoplate.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.fridgetoplate.interfaces.Profile;
import com.fridgetoplate.model.ProfileModel;
import com.fridgetoplate.repository.ProfileRepository;
import com.fridgetoplate.response.ProfileResponse;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE })
@RequestMapping("/profiles")

public class ProfileController {
    @Autowired
    private ProfileRepository profileRepository;

    @PostMapping("/create")
    public ProfileModel save(@RequestBody ProfileModel profile) {
        return profileRepository.save(profile);
    }


    @GetMapping("/{name}")
    public ProfileResponse findByName(@PathVariable(value = "name") String name) {
        return profileRepository.findByName(name);
    }

    @GetMapping
    public List<ProfileModel> findAll() {
        return profileRepository.findAll();
    }

    @GetMapping("/testing")
    public String testing() {
        return "Testing purposes";
    }

    @PutMapping("/{id}")
    public Profile update(@PathVariable(value = "id") String id, @RequestBody Profile profile) {
        return profileRepository.update(id, profile);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable(value = "id") String id) {
        return profileRepository.delete(id);
    }
}
