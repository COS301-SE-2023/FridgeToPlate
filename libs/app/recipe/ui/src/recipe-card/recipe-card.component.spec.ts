import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeCardComponent } from './recipe-card.component';
import { IonicModule } from '@ionic/angular';
import { IRecipe, IRecipeDesc } from '@fridge-to-plate/app/recipe/utils';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router'; 
import { NgxsModule, State, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { IProfile, SaveRecipe, RemoveSavedRecipe, AddToMealPlan, RemoveFromMealPlan } from '@fridge-to-plate/app/profile/utils';
import { RouterTestingModule } from '@angular/router/testing';
import { ShowError } from '@fridge-to-plate/app/error/utils';
import { IMealPlan } from '@fridge-to-plate/app/meal-plan/utils';
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

    // Tests that toggleDropdown method toggles the value of 'showMenu' from false to true
  it('test toggle dropdown toggles show menu from false to true', () => {
    component.showMenu = false;
    component.toggleMealPlan();
    expect(component.showMenu).toBe(true);
});

    // Tests that a recipe can be added to the meal plan successfully
    it('test add to meal plan successfully', () => {
      component.mealType = 'Breakfast';
      component.addToMealPlan("Breakfast");
      expect(component.added).toBe(true);
      expect(store.dispatch).toBeCalledWith(new AddToMealPlan(testRecipe, "Breakfast"));
  });
  
  it('should set added to true if recipe is in meal plan', () => {
    component.ngOnInit();
    expect(component.added).toBe(true);
  });

  it('should dispatch ShowError action if recipe is not available to add to meal plan', () => {
    component.recipe = null;
    component.addToMealPlan("Breakfast");
    expect(store.dispatch).toHaveBeenCalledWith(new ShowError('ERROR: No recipe available to add to meal plan.'));
  });

  it('should dispatch ShowError action if recipe is not available to remove from meal plan', () => {
    component.recipe = null;
    component.removeFromMealPlan();
    expect(store.dispatch).toHaveBeenCalledWith(new ShowError('ERROR: No recipe available to remove from meal plan.'));
  });

  it('should return true if mealPlan has breakfast', () => {
    const testMealPlan: IMealPlan = {
      username: "jdoe",
      date: "",
      breakfast: testRecipe,
      lunch: null,
      dinner: null,
      snack: null
    }

    expect(component.checkMealPlan(testMealPlan)).toBe(true);
  });

  it('should return true if mealPlan has lunch', () => {
    const testMealPlan: IMealPlan = {
      username: "jdoe",
      date: "",
      breakfast: null,
      lunch: testRecipe,
      dinner: null,
      snack: null
    }

    expect(component.checkMealPlan(testMealPlan)).toBe(true);
  });

  it('should return true if mealPlan has dinner', () => {
    const testMealPlan: IMealPlan = {
      username: "jdoe",
      date: "",
      breakfast: null,
      lunch: null,
      dinner: testRecipe,
      snack: null
    }

    expect(component.checkMealPlan(testMealPlan)).toBe(true);
  });

  it('should return true if mealPlan has snack', () => {
    const testMealPlan: IMealPlan = {
      username: "jdoe",
      date: "",
      breakfast: null,
      lunch: null,
      dinner: null,
      snack: testRecipe
    }

    expect(component.checkMealPlan(testMealPlan)).toBe(true);
  });

  it('should return false if mealPlan no meals', () => {
    const testMealPlan: IMealPlan = {
      username: "jdoe",
      date: "",
      breakfast: null,
      lunch: null,
      dinner: null,
      snack: null
    }

    expect(component.checkMealPlan(testMealPlan)).toBe(false);
  });

  it('should return false if mealPlan is null', () => {
    expect(component.checkMealPlan(null)).toBe(false);
  });

  it('should dispatch RemoveFromMealPlan when removeFromMealPlan is called', () => {
    component.removeFromMealPlan();
    expect(store.dispatch).toHaveBeenCalledWith(new RemoveFromMealPlan(testRecipe.recipeId as string));
    expect(component.added).toBe(false);
  });

  it('should navigate to recipe page', () => {
    component.navigateToRecipe();
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
});