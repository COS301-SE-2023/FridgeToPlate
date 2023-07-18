package com.fridgetoplate.repository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBSaveExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.PaginatedScanList;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ExpectedAttributeValue;
import com.fridgetoplate.frontendmodels.MealPlanFrontendModel;
import com.fridgetoplate.frontendmodels.ProfileFrontendModel;
import com.fridgetoplate.frontendmodels.RecipeFrontendModel;
import com.fridgetoplate.interfaces.Profile;
import com.fridgetoplate.interfaces.RecipeDesc;
import com.fridgetoplate.model.Ingredient;
import com.fridgetoplate.model.MealPlanModel;
import com.fridgetoplate.model.ProfileModel;
import com.fridgetoplate.model.RecipeModel;
import com.fridgetoplate.model.Review;

@Repository
public class ProfileRepository {
    
    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    public ProfileModel save(ProfileModel profile){
        dynamoDBMapper.save(profile);
        return profile;
    }

    public ProfileFrontendModel findByName(String username) {

        /*
         * Getting the Profile Response
         */

         // Declaring the Profile Response object
         ProfileFrontendModel profileResponse = new ProfileFrontendModel();

             // Find the Profile model
        ProfileModel profileModel = dynamoDBMapper.load(ProfileModel.class, username);

        if(profileModel == null) {
            return null;
        }

        // Getting profile attributes
        String displayName = profileModel.getDisplayName();
        String email = profileModel.getEmail();
        List<Ingredient> ingredients = profileModel.getIngredients();
        List<String> savedRecipeIds = profileModel.getSavedRecipes();
        List<RecipeDesc> savedRecipes = this.getSavedRecipes(savedRecipeIds);
        List<RecipeDesc> createdRecipes = this.getCreatedRecipes(username);
        String profilePicture = profileModel.getProfilePicture();

        // Creating profile response
        profileResponse.setUsername(username);
        profileResponse.setDisplayName(displayName);
        profileResponse.setEmail(email);
        profileResponse.setIngredients(ingredients);
        profileResponse.setSavedRecipes(savedRecipes);
        profileResponse.setCreatedRecipes(createdRecipes);
        profileResponse.setProfilePicture(profilePicture);

         /*
          * Getting the MealPan response
          */

        // Find Meal
        String date = LocalDate.now().toString();
       
        MealPlanModel mealPlanModel = dynamoDBMapper.load(MealPlanModel.class, username, date);

        if(mealPlanModel != null) {

            // Declare the response object
            MealPlanFrontendModel mealPlanResponse = new MealPlanFrontendModel();

            // creating response
            mealPlanResponse.setUsername(username);

            // Get the Recipe id for breakfast plam
            String breakfastId = mealPlanModel.getBreakfastId();

            // Now, the recipe object
            RecipeDesc breaKfastDesc = createRecipeResponse(dynamoDBMapper.load(RecipeModel.class, breakfastId));

            // Get recipe id for lunch
            String lunchId = mealPlanModel.getLunchId();

            // Now, the recipe object
            RecipeDesc LunchDesc = createRecipeResponse(dynamoDBMapper.load(RecipeModel.class, lunchId));

            // Get the recipe id for dinner
            String dinnerId = mealPlanModel.getDinnerId();

            // Now the recipe object
            RecipeDesc DinnerDesc = createRecipeResponse(dynamoDBMapper.load(RecipeModel.class, dinnerId));


            // Get recipe id for snack
            String SnackId = mealPlanModel.getSnackId();

            // Now the recipe object
            RecipeDesc SnackDesc = createRecipeResponse(dynamoDBMapper.load(RecipeModel.class, SnackId));

            // Creating the mealPlanResponse
            mealPlanResponse.setDate(date);
            mealPlanResponse.setBreakfast(breaKfastDesc);
            mealPlanResponse.setLunch(LunchDesc);
            mealPlanResponse.setDinner(DinnerDesc);
            mealPlanResponse.setSnack(SnackDesc);
            
            // saving meal plan response to profile response
            profileResponse.setCurrMealPlan(mealPlanResponse);
        } else {
            profileResponse.setCurrMealPlan(null);
        }
        
       return profileResponse;
    }

    public List<ProfileModel> findAll(){
        return dynamoDBMapper.scan(ProfileModel.class, new DynamoDBScanExpression());
    }

    public Profile update(String id, Profile profile){

        //Retrieve the profile of the specified ID
        Profile profileData = dynamoDBMapper.load(Profile.class, id);

        System.out.println("profileData");
        System.out.println(profileData);

        //Return null if user profile does not exist
        if(profileData == null)
            return null;
        
        dynamoDBMapper.save(profileData,
                new DynamoDBSaveExpression()
        .withExpectedEntry("profileId",
                new ExpectedAttributeValue(
                        new AttributeValue().withS(id)
                )));
        return profileData;
    }

    public String delete(String id){
       Profile profile = dynamoDBMapper.load(Profile.class, id);
        dynamoDBMapper.delete(profile);
        return "Profile deleted successfully:: " + id;
    }


    private List<RecipeDesc> getSavedRecipes(List<String> ids) {
        List<RecipeDesc> savedRecipes = new ArrayList<>();

        for (String id : ids) {
            RecipeDesc recipe = dynamoDBMapper.load(RecipeModel.class, id);
            if(recipe != null) {
                  savedRecipes.add(recipe);
            }
        }

        return savedRecipes;
    }


    private List<RecipeDesc> getCreatedRecipes(String username) {
        List<RecipeDesc> createdRecipes = new ArrayList<>();

        PaginatedScanList<RecipeModel> scanResult = dynamoDBMapper.scan(RecipeModel.class, new DynamoDBScanExpression());

        for (RecipeModel recipe : scanResult) {
        
            if(username.equals(recipe.getCreator())){
                createdRecipes.add(recipe);
            }
        }

        return createdRecipes;
    }

    private RecipeDesc createRecipeResponse(RecipeModel model) {

        if(model == null) {
            return null;
        }

        RecipeFrontendModel response = new RecipeFrontendModel();
        response.setCreator(model.getCreator());
        response.setDescription(model.getDescription());
        response.setDifficulty(model.getDifficulty());
        response.setIngredients(model.getIngredients());
        response.setSteps(model.getSteps());
        response.setMeal(model.getMeal());
        response.setName(model.getName());
        response.setServings(model.getServings());
        response.setPrepTime(model.getPrepTime());
        response.setRecipeId(model.getRecipeId());
        response.setRecipeImage(model.getRecipeImage());
        response.setTags(model.getTags());
        response.setReviews(getReviewsByRecipeId(model.getRecipeId()));
        return response;
    }

     public List<Review> getReviewsByRecipeId(String id) {
        List<Review> reviews = new ArrayList<>();
        
        PaginatedScanList<Review> scanResult = dynamoDBMapper.scan(Review.class, new DynamoDBScanExpression());

        for (Review review : scanResult) {
            
            if (review.getRecipeId().equals(id)) {
                reviews.add(review);
            }
        }

        return reviews;
    }
}
