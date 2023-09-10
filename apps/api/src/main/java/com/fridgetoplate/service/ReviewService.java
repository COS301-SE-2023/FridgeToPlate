package com.fridgetoplate.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fridgetoplate.model.Review;
import com.fridgetoplate.repository.ReviewRepository;

@Service
public class ReviewService {
    

    @Autowired 
    private ReviewRepository reviewRepository;


    public Review saveReview(Review review) {
        return  reviewRepository.save(review);
    }

    public String deleteReview(String recipeId, String reviewId){
        return reviewRepository.delete(recipeId, reviewId);
    }

     public String removeReviews(List<Review> reviews) {
        reviewRepository.removeReviews(reviews);
        return "REVIEWS SUCCESSFULLY DELETED";
    }

    public List<Review> getReviewsById(String recipeId) {
        return reviewRepository.getReviewsById(recipeId);   
    }

    


}