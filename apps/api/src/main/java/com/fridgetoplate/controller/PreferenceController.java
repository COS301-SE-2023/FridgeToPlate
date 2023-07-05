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

import com.fridgetoplate.model.Preference;
import com.fridgetoplate.repository.PreferenceRepository;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE })
@RequestMapping("/preferences")
public class PreferenceController {
    @Autowired
    private PreferenceRepository preferenceRepository;

    @PostMapping("/create")
    public Preference save(@RequestBody Preference preference){
        return preferenceRepository.save(preference);
    }


    @GetMapping("/{id}")
    public Preference findById(@PathVariable(value = "id") String id){
        return preferenceRepository.findById(id);
    }

    @GetMapping
    public List<Preference> findAll(){
        return preferenceRepository.findAll();
    }

    @GetMapping("/testing")
    public String testing() {
        return "Testing purposes";
    }

    @PutMapping("/{id}")
    public Preference update(@PathVariable(value = "id") String id, @RequestBody Preference preference){
        return preferenceRepository.update(id, preference);
    }


    @DeleteMapping("/{id}")
    public String delete(@PathVariable(value = "id") String id){
        return preferenceRepository.delete(id);
    }
}
