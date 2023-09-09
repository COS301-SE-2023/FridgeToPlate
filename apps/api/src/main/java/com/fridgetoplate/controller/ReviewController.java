package com.fridgetoplate.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fridgetoplate.model.Review;
import com.fridgetoplate.service.ReviewService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE })
@RequestMapping("/reviews")

public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping("/create")
    public Review save(@RequestBody Review review){
        return reviewService.saveReview(review);
    }

    @DeleteMapping("/{recipeId}/{reviewId}")
    public String delete(@PathVariable(value = "recipeId") String recipeId, @PathVariable(value = "reviewId") String reviewId) {
        return reviewService.deleteReview(recipeId, reviewId);
    }
}
