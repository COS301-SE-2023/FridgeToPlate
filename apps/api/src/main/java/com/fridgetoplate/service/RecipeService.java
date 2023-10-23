//RecipeService.java
package com.fridgetoplate.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.fridgetoplate.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fridgetoplate.frontendmodels.RecipeFrontendModel;
import com.fridgetoplate.frontendmodels.RecipePreferencesFrontendModel;
import com.fridgetoplate.interfaces.Explore;
import com.fridgetoplate.interfaces.RecipeDesc;
import com.fridgetoplate.interfaces.YoubuteItem;
import com.fridgetoplate.repository.RecipeRepository;

@Service
public class RecipeService {
  @Autowired
  private RecipeRepository recipeRepository;

  @Autowired
  private ReviewService reviewService;

  @Autowired
  private NotificationService notificationService;

  @Autowired
  private ExternalApiService externalApiService;

  public RecipeFrontendModel findFullRecipeById(String id) {
    
    RecipeFrontendModel recipeFrontendModel = this.findById(id);

    if (recipeFrontendModel == null) {
      return null;
    }

    // Get ingredients for Recipe
    List<IngredientModel> ingredientsModel = recipeRepository.findIngredientsByRecipeId(id);

    List<Ingredient> ingredients = new ArrayList<>();
    for (IngredientModel ingredientModel : ingredientsModel) {
      Ingredient ingredient = new Ingredient();
      ingredient.setName(ingredientModel.getName());
      ingredient.setAmount(ingredientModel.getAmount());

      if (ingredientModel.getUnit() != null) {
        ingredient.setUnit(ingredientModel.getUnit());
      } else {
        ingredient.setUnit("");
      }

      ingredients.add(ingredient);
    }

    // Add Ingredients to Recipe
    recipeFrontendModel.setIngredients(ingredients);

    /*
     * Getting the Reviews
     */

    // Declaring the Reviews object
    List<Review> reviews = reviewService.getReviewsById(id);

    // Adding the reviews to the recipe response
    recipeFrontendModel.setReviews(reviews);

    if (recipeFrontendModel.getYoutubeId() == null || recipeFrontendModel.getYoutubeId().isEmpty()) {
      try {

        YoubuteItem[] videos = externalApiService.spoonacularVideoSearch(recipeFrontendModel.getName() + " Recipe").getItems();

        if (videos.length > 0) {
          recipeFrontendModel.setYoutubeId(videos[0].getId().videoId);
          this.update(recipeFrontendModel);
        }

      } catch (Exception e) {
        e.printStackTrace();
      }
    }

    return recipeFrontendModel;

  }

  public RecipeFrontendModel findById(String id) {

    /*
     * Getting the Recipe Response
     */

    // Declaring the Recipe Response object
    RecipeFrontendModel recipeResponse = new RecipeFrontendModel();

    // Find the Recipe model
    RecipeModel recipeModel = recipeRepository.findById(id);

    if (recipeModel == null) {
      return null;
    }

    // Getting recipe attributes
    String recipeId = recipeModel.getRecipeId();
    String difficulty = recipeModel.getDifficulty();
    String recipeImage = recipeModel.getRecipeImage();
    String name = recipeModel.getName();
    List<String> tags = recipeModel.getTags();
    String meal = recipeModel.getMeal();
    String description = recipeModel.getDescription();
    Integer prepTime = recipeModel.getPrepTime();
    List<String> instructions = recipeModel.getSteps();
    String creator = recipeModel.getCreator();
    Integer servings = recipeModel.getServings();
    Double rating = recipeModel.getRating();
    String youtubeId = recipeModel.getYoutubeId();

    // Creating recipe response
    recipeResponse.setRecipeId(recipeId);
    recipeResponse.setDifficulty(difficulty);
    recipeResponse.setRecipeImage(recipeImage);
    recipeResponse.setName(name);
    recipeResponse.setTags(tags);
    recipeResponse.setMeal(meal);
    recipeResponse.setDescription(description);
    recipeResponse.setPrepTime(prepTime);
    recipeResponse.setSteps(instructions);
    recipeResponse.setCreator(creator);
    recipeResponse.setServings(servings);
    recipeResponse.setRating(rating);
    recipeResponse.setYoutubeId(youtubeId);

    return recipeResponse;
  }

  public RecipeFrontendModel save(RecipeFrontendModel recipe) {

    if (recipe.getRecipeId() != null) {
      RecipeModel recipeModel = recipeRepository.findById(recipe.getRecipeId());

      if (recipeModel != null) {
        return this.findById(recipeModel.getRecipeId());
      }
    }

    RecipeModel model = new RecipeModel();
    model.setRecipeId(recipe.getRecipeId());
    model.setDifficulty(recipe.getDifficulty());
    model.setRecipeImage(recipe.getRecipeImage());
    model.setName(recipe.getName().toLowerCase());
    model.setTags(recipe.getTags());
    model.setMeal(recipe.getMeal());
    model.setDescription(recipe.getDescription());
    model.setPrepTime(recipe.getPrepTime());
    model.setSteps(recipe.getSteps());
    model.setCreator(recipe.getCreator());
    model.setServings(recipe.getServings());
    model.setViews(0);
    model.setRating(null);

    if (recipe.getYoutubeId() != null && !recipe.getYoutubeId().isEmpty()) {
      String ytId = recipe.getYoutubeId();

      int i = ytId.indexOf("v=");
      if (i > 0) {

        ytId = ytId.substring(i + 2, i + 13);
        model.setYoutubeId(ytId);
      } else {
        model.setYoutubeId(recipe.getYoutubeId());
      }

    }

    recipeRepository.saveRecipe(model);

    recipe.setRecipeId(model.getRecipeId());

        for (Ingredient ingredient : recipe.getIngredients()) {
            IngredientModel ingredientModel = new IngredientModel();
            ingredientModel.setRecipeId(recipe.getRecipeId());
            ingredientModel.setName(ingredient.getName().toLowerCase());
            ingredientModel.setAmount(ingredient.getAmount());
            ingredientModel.setUnit(ingredient.getUnit());

      recipeRepository.saveIngredient(ingredientModel);
    }
    return recipe;
  }

  public RecipeFrontendModel update(RecipeFrontendModel recipe) {

    RecipeModel model = recipeRepository.findById(recipe.getRecipeId());
    model.setRecipeId(recipe.getRecipeId());
    model.setDifficulty(recipe.getDifficulty());
    model.setRecipeImage(recipe.getRecipeImage());
    model.setName(recipe.getName().toLowerCase());
    model.setTags(recipe.getTags());
    model.setMeal(recipe.getMeal());
    model.setDescription(recipe.getDescription());
    model.setPrepTime(recipe.getPrepTime());
    model.setSteps(recipe.getSteps());
    model.setCreator(recipe.getCreator());
    model.setServings(recipe.getServings());
    
    List<Review> reviews = reviewService.getReviewsById(recipe.getRecipeId());
    Double totalRating = 0.0;
    for (Review recipeReview : reviews) {
        totalRating += recipeReview.getRating();
    }

    if (reviews.size() > 0) {
        model.setRating(totalRating / reviews.size());
    } else {
        model.setRating(null);
    }
    
    if (recipe.getYoutubeId() != null && !recipe.getYoutubeId().isEmpty()) {
      String ytId = recipe.getYoutubeId();

      int i = ytId.indexOf("v=");
      if (i > 0) {

        ytId = ytId.substring(i + 2, i + 13);
        model.setYoutubeId(ytId);
      } else {
        model.setYoutubeId(recipe.getYoutubeId());
      }

    }

    recipeRepository.saveRecipe(model);

    List<IngredientModel> currIngredients = this.findIngredientsByRecipeId(recipe.getRecipeId());
    recipeRepository.removeIngredients(currIngredients);

    for (Ingredient ingredient : recipe.getIngredients()) {

          IngredientModel ingredientModel = new IngredientModel();
          ingredientModel.setRecipeId(recipe.getRecipeId());
          ingredientModel.setName(ingredient.getName().toLowerCase());
          ingredientModel.setAmount(ingredient.getAmount());
          ingredientModel.setUnit(ingredient.getUnit());

      recipeRepository.saveIngredient(ingredientModel);
    }

    return recipe;
  }

  public RecipeDeleteResponseModel delete(String id) {
    RecipeDeleteResponseModel response = new RecipeDeleteResponseModel();
    try {
      RecipeModel recipe = recipeRepository.findById(id);

      if (recipe == null) {
        response.setResponse("NOT FOUND");
      }

      recipeRepository.removeIngredients(recipeRepository.findIngredientsByRecipeId(id));
      reviewService.removeReviews(reviewService.getReviewsById(id));
      recipeRepository.deleteRecipe(recipe);
      response.setResponse("RECIPE SUCCESSFULLY DELETED");
    } catch (Exception exception) {
      response.setResponse(exception.getMessage());
      return response;
    }
    return response;
  }

  public List<RecipeDesc> getCreatedRecipes(String username) {
    List<RecipeDesc> recipes = new ArrayList<>();
    List<RecipeModel> scanResult = recipeRepository.getCreatedRecipes(username);

    for (RecipeModel recipeModel : scanResult) {
      RecipeDesc recipeDesc = new RecipeDesc();
      recipeDesc.setRecipeId(recipeModel.getRecipeId());
      recipeDesc.setName(recipeModel.getName());
      recipeDesc.setRecipeImage(recipeModel.getRecipeImage());
      recipeDesc.setTags(recipeModel.getTags());
      recipeDesc.setDifficulty(recipeModel.getDifficulty());
      recipeDesc.setRating(recipeModel.getRating());
      recipes.add(recipeDesc);
    }

    return recipes;
  }

  public List<RecipeDesc> getSavedRecipes(List<String> ids) {
    List<RecipeDesc> recipes = new ArrayList<>();

    if (ids == null || ids.isEmpty()) {
      return recipes;
    }

    RecipeFrontendModel retrievedRecipeFrontendModel;

    for (String id : ids) {

      retrievedRecipeFrontendModel = findById(id);

      if (retrievedRecipeFrontendModel.getRecipeId().equals(id)) {
        RecipeDesc recipeDesc = new RecipeDesc();
        recipeDesc.setRecipeId(retrievedRecipeFrontendModel.getRecipeId());
        recipeDesc.setName(retrievedRecipeFrontendModel.getName());
        recipeDesc.setRecipeImage(retrievedRecipeFrontendModel.getRecipeImage());
        recipeDesc.setTags(retrievedRecipeFrontendModel.getTags());
        recipeDesc.setDifficulty(retrievedRecipeFrontendModel.getDifficulty());
        recipeDesc.setRating(retrievedRecipeFrontendModel.getRating());
        recipes.add(recipeDesc);
      }

    }

    return recipes;
  }

  public List<List<RecipeDesc>> findAllByPreferences(RecipePreferencesFrontendModel recipePreferences, List<Ingredient> userIngredients) {

    List<IngredientModel> ingredientModels;
    RecipeFrontendModel recipe;
    List<RecipeFrontendModel> recipes = new ArrayList<>();

      // Getting recipes from the specificied ingredients
      for (Ingredient ingredient : userIngredients) {
        ingredientModels = recipeRepository.getIngredientModels(ingredient.getName().toLowerCase());

        for (IngredientModel ingredientModel : ingredientModels) {
          recipe = findFullRecipeById(ingredientModel.getRecipeId());

          if (recipes.contains(recipe) == false) {
            recipes.add(recipe);
          }
        }
      }

    // Getting recipes from the specificied preferences
    List<RecipeDesc> recipesSortByPreferences = new ArrayList<>();

    // Extracting the rating from the preferences
    String preferredRatingStr;
    if (recipePreferences.getRating() != null) {
      preferredRatingStr = recipePreferences.getRating().trim();
    } else {
      preferredRatingStr = "";
    }

    Double preferredRating = 0.0;
    if (!preferredRatingStr.isEmpty()) {
      preferredRating = (double) Character.getNumericValue(preferredRatingStr.charAt(0));
    }

    // Extracting the servings from the preferences
    String preferredServingsStr;
    Integer preferredServingUpper = 0, preferredServingLower = 0;

    if (recipePreferences.getServings() != null) {
      if (recipePreferences.getServings().contains("-")) {
        preferredServingsStr = recipePreferences.getServings().trim();
        int index = preferredServingsStr.indexOf("-");
        preferredServingUpper = Character.getNumericValue(preferredServingsStr.charAt(index + 1));
      } else if (recipePreferences.getServings().contains("+")) {
        preferredServingsStr = recipePreferences.getServings().trim();
        preferredServingLower = Character.getNumericValue(preferredServingsStr.charAt(0));
      }
    }

    // Extracting the prep time from the preferences
    Integer preferredPrepTimeUpper = 0, preferredPrepTimeLower = 0;

    if (recipePreferences.getPrepTime() != null) {
      if (recipePreferences.getPrepTime().contains("<")) {
        preferredPrepTimeUpper = 30;
      } else if (recipePreferences.getPrepTime().contains("-")) {
        preferredPrepTimeUpper = 60;
      } else if (recipePreferences.getPrepTime().contains("+")) {
        preferredPrepTimeLower = 60;
      }
    }

    Collections.shuffle(recipes);
    List<RecipeDesc> recipesUnflitered = new ArrayList<>();
    for (RecipeFrontendModel selectedRecipe : recipes) {

      if (recipesUnflitered.size() < 24) {
        RecipeDesc recipeDesc = new RecipeDesc();
        recipeDesc.setRecipeId(selectedRecipe.getRecipeId());
        recipeDesc.setName(selectedRecipe.getName());
        recipeDesc.setRecipeImage(selectedRecipe.getRecipeImage());
        recipeDesc.setTags(selectedRecipe.getTags());
        recipeDesc.setDifficulty(selectedRecipe.getDifficulty());
        recipeDesc.setRating(selectedRecipe.getRating());
        recipesUnflitered.add(recipeDesc);
      }

      if (numberIngredients(selectedRecipe, userIngredients) < selectedRecipe.getIngredients().size() - 1) {
        continue;
      }

      if (recipePreferences.getDifficulty() != null && !recipePreferences.getDifficulty().isEmpty() && !recipePreferences.getDifficulty().equals(selectedRecipe.getDifficulty())) {
        continue;
      }

      if (recipePreferences.getMeal() != null && !recipePreferences.getMeal().isEmpty() && !recipePreferences.getMeal().equals(selectedRecipe.getMeal())) {
        continue;
      }

      if (recipePreferences.getServings() != null && !recipePreferences.getServings().isEmpty() && (selectedRecipe.getServings() < preferredServingLower || selectedRecipe.getServings() > preferredServingUpper)) {
        continue;
      }

      if (recipePreferences.getPrepTime() != null && !recipePreferences.getPrepTime().isEmpty() && (selectedRecipe.getPrepTime() < preferredPrepTimeLower || selectedRecipe.getPrepTime() > preferredPrepTimeUpper)) {
        continue;
      }

      if (recipePreferences.getRating() != null && !recipePreferences.getRating().isEmpty() && selectedRecipe.getRating() != null && selectedRecipe.getRating() < preferredRating) {
        continue;
      }

      if (recipesSortByPreferences.size() < 24) {
        RecipeDesc recipeDesc = new RecipeDesc();
        recipeDesc.setRecipeId(selectedRecipe.getRecipeId());
        recipeDesc.setName(selectedRecipe.getName());
        recipeDesc.setRecipeImage(selectedRecipe.getRecipeImage());
        recipeDesc.setTags(selectedRecipe.getTags());
        recipeDesc.setDifficulty(selectedRecipe.getDifficulty());
        recipeDesc.setRating(selectedRecipe.getRating());
        recipesSortByPreferences.add(recipeDesc);
      } else {
        break;
      }
    }

    List<List<RecipeDesc>> out = new ArrayList<>();
    out.add(recipesSortByPreferences);
    out.add(recipesUnflitered);
    return out;
  }

  public RecipeFrontendModel[] saveBatch(RecipeFrontendModel[] recipeList) {
    for (RecipeFrontendModel recipeFrontendModel : recipeList) {
      this.save(recipeFrontendModel);
    }
    return recipeList;
  }

  public List<RecipeFrontendModel> getRecipesByRecipeName(String recipeName) {
    List<RecipeFrontendModel> recipes = new ArrayList<>();

    List<RecipeModel> scanResult = recipeRepository.getRecipesByRecipeName(recipeName);

    for (RecipeModel recipe : scanResult) {
      RecipeFrontendModel response = this.findById(recipe.getRecipeId());
      if (response != null) {
        recipes.add(response);
      }
    }

    return recipes;
  }

  public List<RecipeDesc> filterSearch(Explore searchObject) {

    List<Object> recipeObjects = this.recipeRepository.filterSearch(searchObject);
    List<RecipeDesc> recipes = new ArrayList<>();
    for (Object recipeObject : recipeObjects) {
      RecipeModel recipeModel = (RecipeModel) recipeObject;
      RecipeDesc recipeDesc = new RecipeDesc();
      recipeDesc.setRecipeId(recipeModel.getRecipeId());
      recipeDesc.setName(recipeModel.getName());
      recipeDesc.setRecipeImage(recipeModel.getRecipeImage());
      recipeDesc.setTags(recipeModel.getTags());
      recipeDesc.setDifficulty(recipeModel.getDifficulty());
      recipeDesc.setRating(recipeModel.getRating());
      recipes.add(recipeDesc);
    }

    return recipes;
  }

  public List<IngredientModel> findIngredientsByRecipeId(String recipeId) {
    return this.recipeRepository.findIngredientsByRecipeId(recipeId);
  }

  public RecipeFrontendModel increaseViews(String recipeId) {

    RecipeModel recipeModel = recipeRepository.findById(recipeId);
    if (recipeModel != null) {

      recipeModel.setViews(recipeModel.getViews() + 1);
      recipeRepository.saveRecipe(recipeModel);

      if (!recipeModel.getCreator().equals("Spoonacular")) {

        NotificationModel notif = new NotificationModel();
        switch (recipeModel.getViews()) {
          case 25:

            notif.setUserId(recipeModel.getCreator());
            notif.setMetadata("/recipe/" + recipeModel.getRecipeId());
            notif.setNotificationPic(recipeModel.getRecipeImage());
            notif.setTitle(recipeModel.getName() + " just receached 25 views");
            notif.setTitle("Congratulations! Your recipe just hit 25 views. Keep cooking and sharing!");

            notificationService.save(notif);
            break;
          case 100:

            notif.setUserId(recipeModel.getCreator());
            notif.setMetadata("/recipe/" + recipeModel.getRecipeId());
            notif.setNotificationPic(recipeModel.getRecipeImage());
            notif.setTitle(recipeModel.getName() + " just receached 100 views");
            notif.setTitle("Wow, your recipe has reached 100 views! You're cooking up a storm!");

            notificationService.save(notif);
            break;
          case 500:

            notif.setUserId(recipeModel.getCreator());
            notif.setMetadata("/recipe/" + recipeModel.getRecipeId());
            notif.setNotificationPic(recipeModel.getRecipeImage());
            notif.setTitle(recipeModel.getName() + " just receached 500 views");
            notif.setTitle("500 views on your recipe! You're a culinary sensation!");

            notificationService.save(notif);
            break;
          case 1000:

            notif.setUserId(recipeModel.getCreator());
            notif.setMetadata("/recipe/" + recipeModel.getRecipeId());
            notif.setNotificationPic(recipeModel.getRecipeImage());
            notif.setTitle(recipeModel.getName() + " just receached 1000 views");
            notif.setTitle("Incredible! Your recipe has been viewed 1000 times. You're a recipe rockstar!");

            notificationService.save(notif);
            break;
        }
      }
    }

    return this.findById(recipeId);
  }

  private Double numberIngredients(RecipeFrontendModel recipe, List<Ingredient> ingredients) {

    Double num = 1.0;
    for (Ingredient ingredient : ingredients) {

      for (Ingredient recipeIngredient : recipe.getIngredients()) {

        if (recipeIngredient.getName().contains(ingredient.getName())) {
          num++;
          break;
        }

      }
    }

    return num;

  }

}
