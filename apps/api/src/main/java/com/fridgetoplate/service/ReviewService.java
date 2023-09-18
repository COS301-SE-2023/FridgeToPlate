package com.fridgetoplate.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fridgetoplate.frontendmodels.RecipeFrontendModel;
import com.fridgetoplate.model.NotificationModel;
import com.fridgetoplate.model.Review;
import com.fridgetoplate.repository.ReviewRepository;

@Service
public class ReviewService {
    

    @Autowired 
    private ReviewRepository reviewRepository;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private RecipeService recipService;

    public Review saveReview(Review review) {

        NotificationModel notif = new NotificationModel();

        RecipeFrontendModel recipe = recipService.findById(review.getRecipeId());
        notif.setUserId(recipe.getCreator());
        notif.setMetadata("/recipe/" + recipe.getRecipeId());
        notif.setNotificationPic(recipe.getRecipeImage());
        notif.setTitle(recipe.getName() + " recieved a review");
        notif.setTitle(review.getUsername() + " reviewed your recipe, check out what they said.");

        notificationService.save(notif);

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
