/**
 * This is a Java class that defines the REST API endpoints for managing ingredients in a recipe
 * application.
 */
package com.fridgetoplate.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fridgetoplate.interfaces.Explore;
import com.fridgetoplate.interfaces.RecipeDesc;
import com.fridgetoplate.service.ExploreService;
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE })
@RequestMapping("/explore")

public class ExploreController {
    
    @Autowired
    private  ExploreService exploreService;

    @PostMapping("/search")
    public List<RecipeDesc> findBySearch(@RequestBody Explore search) {
        return exploreService.findBySearch(search);
    }

}
