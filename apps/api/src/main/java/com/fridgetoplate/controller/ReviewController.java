package com.fridgetoplate.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.fridgetoplate.model.Review;
import com.fridgetoplate.repository.ReviewRepository;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE })
@RequestMapping("/reviews")

public class ReviewController {
    
    @Autowired
    private ReviewRepository reviewRepository;

    @PostMapping("/create")
    public Review save(@RequestBody Review review){
        return reviewRepository.save(review);
    }

     @GetMapping("/{id}")
    public List<Review> findReviewsById(@PathVariable(value = "id") String id){
        return reviewRepository.getReviewsByRecipeId(id);
    }

     @GetMapping
    public List<Review> findAll(){
        return reviewRepository.findAll();
    }
}
