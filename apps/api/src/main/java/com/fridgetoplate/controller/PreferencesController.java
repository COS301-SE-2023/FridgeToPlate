package com.fridgetoplate.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fridgetoplate.model.Preferences;
import com.fridgetoplate.repository.PreferencesRepository;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE })
@RequestMapping("/preferences")
public class PreferencesController {
    @Autowired
    private PreferencesRepository preferencesRepository;

    @PostMapping("/create")
    public Preferences save(@RequestBody Preferences preferences){
        return preferencesRepository.save(preferences);
    }

    @GetMapping("/{username}")
    public Preferences findById(@PathVariable(value = "username") String username){
        return preferencesRepository.findByName(username);
    }

    @PutMapping("/{username}")
    public Preferences update(@PathVariable(value = "username") String username, @RequestBody Preferences preferences){
        return preferencesRepository.update(username, preferences);
    }
}
