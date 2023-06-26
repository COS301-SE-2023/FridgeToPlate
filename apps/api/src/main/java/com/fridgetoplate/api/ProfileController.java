package com.fridgetoplate.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fridgetoplate.model.Profile;
import com.fridgetoplate.repository.ProfileRepository;

@RestController
@RequestMapping("/profiles")
public class ProfileController {
    @Autowired
    private ProfileRepository profileRepository;

    @PostMapping("/create")
    public Profile save(@RequestBody Profile recipe){
        return profileRepository.save(recipe);
    }
    

    @GetMapping("/{id}")
    public Profile findById(@PathVariable(value = "id") String id){
        return profileRepository.findById(id);
    }

    @GetMapping
    public List<Profile> findAll(){
        return profileRepository.findAll();
    }

    @GetMapping("/testing")
    public String testing() {
        return "Testing purposes";
    }

    @PutMapping("/{id}")
    public Profile update(@PathVariable(value = "id") String id, @RequestBody Profile profile){
        return profileRepository.update(id, profile);
    }


    @DeleteMapping("/{id}")
    public String delete(@PathVariable(value = "id") String id){
        return profileRepository.delete(id);
    }
}   
