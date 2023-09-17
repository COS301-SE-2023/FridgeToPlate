import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeCardComponent } from './recipe-card.component';
import { IonicModule } from '@ionic/angular';
import { IRecipe, IRecipeDesc, IncreaseViews } from '@fridge-to-plate/app/recipe/utils';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxsModule, State, Store } from '@ngxs/store';
import { Injectable, NgZone } from '@angular/core';
import { IProfile, SaveRecipe, RemoveSavedRecipe, AddToMealPlan, RemoveFromMealPlan } from '@fridge-to-plate/app/profile/utils';
import { RouterTestingModule } from '@angular/router/testing';
import { ShowError } from '@fridge-to-plate/app/error/utils';
import { Navigate } from '@ngxs/router-plugin';
import { LoadRecipe } from '@fridge-to-plate/app/edit-recipe/utils';

describe('RecipeCardComponent', () => {
  let component: RecipeCardComponent;
  let fixture: ComponentFixture<RecipeCardComponent>;
  let store: Store;
  let dispatchSpy: jest.SpyInstance;

  const testRecipe: IRecipe = {
    recipeId: 'test-id',
    name: 'Pizza',
    recipeImage: 'image-url',
    difficulty: 'Easy',
    ingredients: [
      {
        name: 'Carrot',
        unit: 'ml',
        amount: 10,
      },
    ],
    description: 'Heading',
    tags: ['Paleo'],
    servings: 2,
    prepTime: 30,
    meal: 'Snack',
    steps: ['Chop onions'],
    creator: "Kristap P",
    rating: 2,
  };

  const testProfile: IProfile = {
    displayName: "John Doe",
    username: "jdoe",
    email: "jdoe@gmail.com",
    savedRecipes: [],
    ingredients: [],
    profilePic: "image-url",
    createdRecipes: [],
    currMealPlan: {
      username: "jdoe",
      date: "",
      breakfast: null,
      lunch: testRecipe,
      dinner: null,
      snack: null
    },
  }

  @State({
    name: 'profile',
    defaults: {
      profile: testProfile
    }
  })
  @Injectable()
  class MockProfileState {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeCardComponent],
      imports: [IonicModule, HttpClientModule, RouterTestingModule, NgxsModule.forRoot([MockProfileState])],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeCardComponent);
    component = fixture.componentInstance;
    component.recipe = testRecipe;
    store = TestBed.inject(Store);
    dispatchSpy = jest.spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be saved', () => {
    component.bookmarked = false;
    component.bookmarked = false;
    component.changeSaved();
    expect(dispatchSpy).toBeCalledWith(new SaveRecipe(component.recipe as IRecipeDesc));
    expect(dispatchSpy).toBeCalledWith(new SaveRecipe(component.recipe as IRecipeDesc));
  });

  it('should be unsaved', () => {
    component.bookmarked = true;
    component.changeSaved();
    expect(dispatchSpy).toBeCalledWith(new RemoveSavedRecipe(component.recipe as IRecipeDesc));
  });

    // Tests that the user can navigate to the edit-recipe page with the correct query params
    it('test edit recipe with recipe id', () => {
      component.recipe = { recipeId: '123' };
      component.edit();
      expect(store.dispatch).toBeCalledWith(new LoadRecipe(component.recipe.recipeId));
  });

  it('test edit recipe with undefined recipe', () => {
    const showErrorSpy = jest.spyOn(TestBed.inject(Store), 'dispatch');
    component.recipe = undefined;
    component.edit();
    expect(showErrorSpy).toHaveBeenCalledWith(new ShowError('ERROR: No recipe available to edit.'));
});

  it('Should dispatch Load recipe Action', ()=>{
    const loadRecipeSpy = jest.spyOn(TestBed.inject(Store), 'dispatch');
    component.recipe = { recipeId : 'Valid_recipe_id'} as IRecipe;
    component.edit();
    expect(loadRecipeSpy).toHaveBeenCalledWith(new LoadRecipe('Valid_recipe_id'));
  })

    // Tests that toggleDropdown method toggles the value of 'showMenu' from false to true
  it('test toggle dropdown toggles show menu from false to true', () => {
    component.showMenu = false;
    component.toggleMealPlan();
    expect(component.showMenu).toBe(true);
});

    // Tests that a recipe can be added to the meal plan successfully
  it('test add to meal plan successfully', () => {
    component.recipe = testRecipe;
    const tempMeal = "Breakfast";
    const tempDate = '2022-03-11';

    component.addToMealPlan({meal: tempMeal, date: tempDate});
    expect(store.dispatch).toHaveBeenCalledWith(new AddToMealPlan(testRecipe, tempMeal, tempDate));
  });

  it('should dispatch ShowError action if recipe is not available to add to meal plan', () => {
    component.recipe = null;
    const tempMeal = "Breakfast";
    const tempDate = '2022-03-11';

    component.addToMealPlan({meal: tempMeal, date: tempDate});
    expect(store.dispatch).toHaveBeenCalledWith(new ShowError('ERROR: No recipe available to add to meal plan.'))
  });

  it('should dispatch add to meal plan', () => {
    component.recipe = null;
    component.addToMealPlan("Breakfast");
  });

  it('should dispatch ShowError action if recipe is not available to remove from meal plan', () => {
    component.recipe = null;
    component.removeFromMealPlan();
    expect(store.dispatch).toHaveBeenCalledWith(new ShowError('ERROR: No recipe available to remove from meal plan.'));
  });

  it('should dispatch RemoveFromMealPlan when removeFromMealPlan is called', () => {
    component.removeFromMealPlan();
    expect(store.dispatch).toHaveBeenCalledWith(new RemoveFromMealPlan(testRecipe.recipeId as string));
    expect(component.added).toBe(false);
  });

  it('should navigate to recipe page', () => {
    component.navigateToRecipe();
    expect(store.dispatch).toBeCalledWith(new IncreaseViews(1));
    expect(store.dispatch).toBeCalledWith(new Navigate([`/recipe/${testRecipe.recipeId}`]));
  });
});

describe('RecipeCardComponent', () => {

  let component: RecipeCardComponent;
  let fixture: ComponentFixture<RecipeCardComponent>;
  let store: Store;

  const testRecipe: IRecipe = {
    recipeId: 'test-id',
    name: 'Pizza',
    recipeImage: 'image-url',
    difficulty: 'Easy',
    ingredients: [
      {
        name: 'Carrot',
        unit: 'ml',
        amount: 10,
      },
    ],
    description: 'Heading',
    tags: ['Paleo'],
    servings: 2,
    prepTime: 30,
    meal: 'Snack',
    steps: ['Chop onions'],
    creator: "Kristap P",
    rating: 2
  };

  @State({
    name: 'profile',
    defaults: {
      profile: null
    }
  })
  @Injectable()
  class MockProfileState {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeCardComponent],
      imports: [IonicModule, HttpClientModule, RouterTestingModule, NgxsModule.forRoot([MockProfileState])],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeCardComponent);
    component = fixture.componentInstance;
    component.recipe = testRecipe;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should be default if profile becomes null', () => {
    component.ngOnInit();
    expect(component.bookmarked).toBe(false);
    expect(component.editable).toBe(false);
    expect(component.added).toBe(false);
  });

  describe('RecipeCardComponent', () => {
    let component: RecipeCardComponent;
    let store: Store;
    let router: Router;
    let zone: NgZone;

    beforeEach(() => {
      component = new RecipeCardComponent(store, router, zone); // Pass null for dependencies since they are not used in this test
    });

    it('should calculate the correct rating value', () => {
      component.recipe = { rating: 4 }; // Set the recipe object with a rating of 4

      // Test various index values
      expect(component.getRatingValue(0)).toEqual(5); // 4 - 0 + 1 = 5
      expect(component.getRatingValue(1)).toEqual(4); // 4 - 1 + 1 = 4
      expect(component.getRatingValue(2)).toEqual(3); // 4 - 2 + 1 = 3
      expect(component.getRatingValue(3)).toEqual(2); // 4 - 3 + 1 = 2

      // Test a negative index
      expect(component.getRatingValue(-1)).toEqual(6); // 4 - (-1) + 1 = 6
    });

    it('should return undefined when recipe is not set', () => {
      expect(component.getRatingValue(0)).toBeNaN;
    });
  });

  describe('RecipeCardComponent', () => {
    let component: RecipeCardComponent;
    let store: Store;
    let router: Router;
    let zone: NgZone;

    beforeEach(() => {
      component = new RecipeCardComponent(store, router, zone); // Replace null with appropriate dependencies
    });

    describe('getStarName', () => {
      it('should return "star" when rating is greater than or equal to 1 or less than or equal to 0', () => {
        expect(component.getStarName(1)).toBe('star');
        expect(component.getStarName(0)).toBe('star');
        expect(component.getStarName(0.5)).toBe('star-half');
      });
    });
  });
});

describe('RecipeCardComponent', () => {
  let component: RecipeCardComponent;
  let store: Store;
  let router: Router;
  let zone: NgZone;

  beforeEach(() => {
    component = new RecipeCardComponent(store, router, zone);;
  });

  it('should return the correct star class based on the rating', () => {
    expect(component.getStarClass(undefined)).toBe('ion-star');
    expect(component.getStarClass(0.8)).toBe('star-filled');
    expect(component.getStarClass(0.6)).toBe('star-half-filled');
    expect(component.getStarClass(0.3)).toBe('star-quarter-filled');
    expect(component.getStarClass(0.1)).toBe('ion-star');
  });
});

