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
import com.fridgetoplate.interfaces.Profile;
import com.fridgetoplate.interfaces.RecipeDesc;
import com.fridgetoplate.model.Ingredient;
import com.fridgetoplate.model.MealPlanModel;
import com.fridgetoplate.model.ProfileModel;
import com.fridgetoplate.model.RecipeModel;
import com.fridgetoplate.response.MealPlanResponse;
import com.fridgetoplate.response.ProfileResponse;

@Repository
public class ProfileRepository {
    
    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    public ProfileModel save(ProfileModel profile){
        dynamoDBMapper.save(profile);
        return profile;
    }

    public ProfileResponse findById(String id){


        /*
         * Getting the Profile Response
         */

         // Declaring the Profile Response object
         ProfileResponse profileResponse = new ProfileResponse();

             // Find the Profile model
        ProfileModel profileModel = dynamoDBMapper.load(ProfileModel.class, id);

        if(profileModel == null) {
            return null;
        }

        // Getting profile attributes
        String displayName = profileModel.getDisplayName();
        String email = profileModel.getEmail();
        List<Ingredient> ingredients = profileModel.getIngredients();
        String username = profileModel.getUsername();
        List<String> savedRecipeIds = profileModel.getSavedRecipes();
        List<RecipeDesc> savedRecipes = this.getSavedRecipes(savedRecipeIds);
        List<RecipeDesc> createdRecipes = this.getCreatedRecipes(username);

        // Creating profile response
        profileResponse.setProfileId(id);
        profileResponse.setUsername(username);
        profileResponse.setDisplayName(displayName);
        profileResponse.setEmail(email);
        profileResponse.setIngredients(ingredients);
        profileResponse.setSavedRecipes(savedRecipes);
        profileResponse.setCreatedRecipes(createdRecipes);

         /*
          * Getting the MealPan response
          */

        // Declare the response object
         MealPlanResponse mealPlanResponse = new MealPlanResponse();
        
   

        // Find Meal
        String date = LocalDate.now().toString();
       
        MealPlanModel mealPlanModel = dynamoDBMapper.load(MealPlanModel.class, username, date);

        // creating response
        mealPlanResponse.setUsername(username);


        if(mealPlanModel != null) {

            // Get the Recipe id for breakfast plam
            String breakfastId = mealPlanModel.getBreakfastId();

            // Now, the recipe object
            RecipeDesc breaKfastDesc = dynamoDBMapper.load(RecipeModel.class, breakfastId);

            // Get recipe id for lunch
            String lunchId = mealPlanModel.getLunchId();

            // Now, the recipe object
            RecipeDesc LunchDesc = dynamoDBMapper.load(RecipeModel.class, lunchId);

            // Get the recipe id for dinner
            String dinnerId = mealPlanModel.getDinnerId();

            // Now the recipe object
            RecipeDesc DinnerDesc = dynamoDBMapper.load(RecipeModel.class, dinnerId);


            // Get recipe id for snack
            String SnackId = mealPlanModel.getSnackId();

            // Now the recipe object
            RecipeDesc SnackDesc = dynamoDBMapper.load(RecipeModel.class, SnackId);


            // Get recipe id for dessert
            String dessertId = mealPlanModel.getDessertId();

            // Now the recipe object
            RecipeDesc dessertDesc =  dynamoDBMapper.load(RecipeModel.class, dessertId);

            // Creating the mealPlanResponse
            mealPlanResponse.setDate(date);
            mealPlanResponse.setBreakfast(breaKfastDesc);
            mealPlanResponse.setLunch(LunchDesc);
            mealPlanResponse.setDinner(DinnerDesc);
            mealPlanResponse.setSnack(SnackDesc);
            mealPlanResponse.setDessert(dessertDesc);
            
            // saving meal plan response to profile response
            profileResponse.setCurrMealPlan(mealPlanResponse);
        }


        
        
       return profileResponse;
    }

    public List<ProfileModel> findAll(){
        return dynamoDBMapper.scan(ProfileModel.class, new DynamoDBScanExpression());
    }

    public Profile update(String id, Profile profile){

        //Retrieve the profile of the specified ID
        Profile profileData =  dynamoDBMapper.load(Profile.class, id);

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
                System.out.println("Hello, there");
                createdRecipes.add(recipe);
            }
        }

        return createdRecipes;
    }

    




    
}
