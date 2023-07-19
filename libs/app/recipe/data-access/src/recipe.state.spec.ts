import {TestBed} from "@angular/core/testing";
import {RecipeService} from "./recipe.api";
import {NgxsModule, State, Store} from "@ngxs/store";
import {AddReview, GetRecipe, UpdateRecipe} from "./recipe.actions";
import {RecipeState} from "./recipe.state";
import {of} from "rxjs";
import {IRecipe} from "@fridge-to-plate/app/recipe/utils";
import {IonicModule} from "@ionic/angular";
import {HttpClientModule} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {RecipePage} from "../../feature/src/recipe.page";
import {RouterTestingModule} from "@angular/router/testing";
import {ReviewModule} from "@fridge-to-plate/app/review/feature";

describe('RecipeState tests', () => {

  @State({
    name: 'recipe',
    defaults: {
      profile: null
    }
  })
  @Injectable()
  class MockRecipeState {}

  const testRecipe: IRecipe = {
    difficulty: 'Easy',
    recipeImage: "https://source.unsplash.com/500x500/?food",
    tags: ['Tasty', 'Experimental'],
    recipeId: '123',
    name: 'Test Recipe',
    description: 'Test Description',
    servings: 4,
    prepTime: 30,
    meal: 'Lunch',
    ingredients: [
      {
        name: 'Test Ingredient',
        amount: 1,
        unit: 'cup'
      }
    ],
    steps: ['Test Step 1', 'Test Step 2'],
    creator: 'Test Creator',
    reviews: []
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule, HttpClientModule, ReviewModule , NgxsModule.forRoot([MockRecipeState]), RouterTestingModule],
      declarations: [RecipePage],
    }).compileComponents();

    const fixture = TestBed.createComponent(RecipePage);
    fixture.detectChanges();
  });

  // Tests that getRecipe returns the expected recipe when given a valid recipeId
  it('test_get_recipe_valid_id', () => {
    const recipeService = TestBed.inject(RecipeService);
    const store = TestBed.inject(Store);

    jest.spyOn(recipeService, 'getRecipeById').mockReturnValue(of(testRecipe));
    store.dispatch(new GetRecipe('123'));
    store.selectOnce(RecipeState.getRecipe).subscribe((result) => {
      expect(result).toEqual(testRecipe);
    });
  });

  // Tests that updateRecipe updates the recipe state with the new recipe
  it('test_update_recipe_valid', () => {
    const store = TestBed.inject(Store);

    store.dispatch(new UpdateRecipe(testRecipe));
    store.selectOnce(RecipeState.getRecipe).subscribe((result) => {
      expect(result).toEqual(testRecipe);
    });
  });

  // Tests that updateRecipe does not update the recipe state when given an invalid recipe
  it('test_update_recipe_invalid', () => {
    const recipeService = TestBed.inject(RecipeService);
    const store = TestBed.inject(Store);

    jest.spyOn(recipeService, 'updateRecipe').mockImplementation(() => {
      throw new Error('Invalid recipe');
    });
    store.dispatch(new UpdateRecipe(testRecipe));
    store.selectOnce(RecipeState.getRecipe).subscribe((result) => {
      expect(result).toBeNull();
    });
  });

  // Tests that addRecipeReview adds a new review to the recipe state
  it('test_add_recipe_review_valid', () => {
    const store = TestBed.inject(Store);

    const review = {
      reviewId: '456',
      recipeId: '123',
      description: 'Test Review',
      rating: 5,
      username: 'Test User'
    };
    store.dispatch(new UpdateRecipe(testRecipe));
    store.dispatch(new AddReview(review));
    store.selectOnce(RecipeState.getRecipe).subscribe((result) => {
      expect(result?.reviews?.length).toBe(1);
      expect(result?.reviews?.[0]).toEqual(review);
    });
  });

  // Tests that addRecipeReview does not add a new review to the recipe state when given an invalid review
  it('test_add_recipe_review_invalid', () => {
    const store = TestBed.inject(Store);

    const review = {
      reviewId: '456',
      recipeId: 'invalid-id',
      description: 'Test Review',
      rating: 5,
      username: 'Test User'
    };
    store.dispatch(new UpdateRecipe(testRecipe));
    store.dispatch(new AddReview(review));
    store.selectOnce(RecipeState.getRecipe).subscribe((result) => {
      expect(result?.reviews?.length).toBe(0);
    });
  });

});
