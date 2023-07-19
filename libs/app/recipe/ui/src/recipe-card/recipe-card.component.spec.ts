import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeCardComponent } from './recipe-card.component';
import { IonicModule } from '@ionic/angular';
import { IRecipe, IRecipeDesc } from '@fridge-to-plate/app/recipe/utils';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router'; 
import { NgxsModule, State, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { IProfile, SaveRecipe, RemoveSavedRecipe, UpdateProfile } from '@fridge-to-plate/app/profile/utils';
import { RouterTestingModule } from '@angular/router/testing';
import { ShowError } from '@fridge-to-plate/app/error/utils';
import { AddToMealPlan, GetMealPlan, IMealPlan, RemoveFromMealPlan } from '@fridge-to-plate/app/meal-plan/utils';
import { of } from 'rxjs';

describe('RecipeCardComponent', () => {
  const testProfile: IProfile = {
    displayName: "John Doe",
    username: "jdoe",
    email: "jdoe@gmail.com",
    savedRecipes: [],
    ingredients: [],
    profilePic: "image-url",
    createdRecipes: [],
    currMealPlan: null,
    }

  @State({ 
    name: 'profile', 
    defaults: {
      profile: testProfile
    } 
  })
  
  @Injectable()
  class MockProfileState {}

  @State({
    name: 'recipe',
    defaults: {
        recipe: {
            name: 'Hello world',
            tags: [],
            difficulty: 'Medium',
            recipeImage: '',
            description: '',
            servings: 1,
            prepTime: 0,
            meal: 'Lunch',
            ingredients: [],
            steps: [],
            creator: '',
            reviews: [],
        }
    }
})
  @Injectable()
  class MockRecipeState {}

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
        const routerSpy = jest.spyOn(TestBed.inject(Router), 'navigate');
        component.recipe = { recipeId: '123' };
        component.edit();
        expect(routerSpy).toHaveBeenCalledWith([
            'edit-recipe'
        ], {
            queryParams: {
                recipeId: '"123"'
            }
        });
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
      component.toggleDropdown();
      expect(component.showMenu).toBe(true);
  });

      // Tests that a recipe can be added to the meal plan successfully
      it('test add to meal plan successfully', () => {
        const recipe = {recipeId: 1};
        const profile = {username: 'user', currMealPlan: null} as IProfile;
        const mealPlan = {username: 'user', date: new Date().toISOString().slice(0, 10), breakfast: recipe, lunch: null, dinner: null, snack: null};
        component.recipe = recipe;
        component.profile = profile;
        component.selectedMealType = 'BreakFast';
        component.addToMealPlan();
        expect(component.added).toBe(true);
        expect(component.profile.currMealPlan).toEqual(mealPlan);
    });
    it('should set added to true if recipe is in meal plan', () => {
      const mealPlan: IMealPlan = {
        username: 'test',
        date: '2022-01-01',
        breakfast: { recipeId: '1' } as IRecipeDesc,
        lunch: null,
        dinner: null,
        snack: null,
      };
      component.mealPlan$ = of(mealPlan);
      component.recipe = { recipeId: '1' };
      component.ngOnInit();
      expect(component.added).toBe(true);
    });
    
    it('should dispatchError action if mealPlan is null', () => {
      component.recipe = { recipeId: '1' };
      component.ngOnInit();
      expect(store.dispatch).toHaveBeenCalledWith(new ShowError('Error: Something is wrong with the mealPlan'));
    });


  it('should dispatch ShowError action if recipe is not available to add to meal plan', () => {
    component.recipe = null;
    component.addToMealPlan();
    expect(store.dispatch).toHaveBeenCalledWith(new ShowError('ERROR: No recipe available to add to meal plan.'));
  });


  it('should dispatch AddToMealPlan and UpdateProfile actions when addToMealPlan is called', () => {
    
    const profile: IProfile = {
      profilePic: 'picture',
      email: 'johnddoe@exampe.co.za',
      displayName: 'John Doe',
      username: 'test',
      savedRecipes: [],
      createdRecipes: [],
      ingredients: [],
      currMealPlan: {
        username: 'test',
        date: '2023-07-19',
        breakfast: { recipeId: '1' } as IRecipeDesc,
        lunch: null,
        dinner: null,
        snack: null,
      }
    };
    component.profile = profile;
    component.recipe = { recipeId: '1' };
    component.selectedMealType = 'Breakfast';
    component.addToMealPlan();
    expect(store.dispatch).toHaveBeenCalledWith( new GetMealPlan("jdoe"))
    expect(store.dispatch).toHaveBeenCalledWith(new AddToMealPlan({
      username: 'test',
      date: '2023-07-19',
      breakfast: { recipeId: '1' } as IRecipeDesc,
      lunch: null,
      dinner: null,
      snack: null,
    }));
    expect(store.dispatch).toHaveBeenCalledWith(new UpdateProfile(profile));
    expect(component.added).toBe(true);
    expect(component.showMenu).toBe(false);
  });

  it('should dispatch ShowError action if meal plan is falsy', () => {
    component.recipe = { recipeId: '1' };
    component.removeFromMealPlan();
    expect(store.dispatch).toHaveBeenCalledWith(new ShowError('Error: Something is wrong with the mealPlan'));
  });

  it('should dispatch ShowError action if profile is falsy', () => {
    jest.spyOn(RecipeCardComponent.prototype, 'ngOnInit').mockImplementation( ()=> {
    component.profile
    })
    component.recipe = { recipeId: '1' };
    component.removeFromMealPlan();
    expect(store.dispatch).toHaveBeenCalledWith(new ShowError('Error: Something is wrong with the mealPlan'));
  });

  it('should dispatch ShowError action if recipe is not available to remove from meal plan', () => {
    component.profile = { username: 'test' }as IProfile;
    component.recipe = null;
    component.removeFromMealPlan();
    expect(store.dispatch).toHaveBeenCalledWith(new ShowError('ERROR: No recipe available to remove from meal plan.'));
  });

  it('should return true if mealPlan has breakfast', () => {
    const mealPlan: IMealPlan = {
      username: 'test',
      date: '2022-01-01',
      breakfast: { recipeId: '1' } as IRecipeDesc,
      lunch: null,
      dinner: null,
      snack: null,
    };
    expect(component.checkMealPlan(mealPlan)).toBe(true);
  });

  it('should return true if mealPlan has lunch', () => {
    const mealPlan: IMealPlan = {
      username: 'test',
      date: '2022-01-01',
      breakfast: null,
      lunch: { recipeId: '1' } as IRecipeDesc,
      dinner: null,
      snack: null,
    };
    expect(component.checkMealPlan(mealPlan)).toBe(true);
  });

  it('should return true if mealPlan has dinner', () => {
    const mealPlan: IMealPlan = {
      username: 'test',
      date: '2022-01-01',
      breakfast: null,
      lunch: null,
      dinner: { recipeId: '1' } as IRecipeDesc,
      snack: null,
    };
    expect(component.checkMealPlan(mealPlan)).toBe(true);
  });

  it('should return true if mealPlan has snack', () => {
    const mealPlan: IMealPlan = {
      username: 'test',
      date: '2022-01-01',
      breakfast: null,
      lunch: null,
      dinner: null,
      snack: { recipeId: '1' } as IRecipeDesc,
    };
    expect(component.checkMealPlan(mealPlan)).toBe(true);
  });

  it('should return false if mealPlan no meals', () => {
    const mealPlan: IMealPlan = {
      username: 'test',
      date: '2022-01-01',
      breakfast: null,
      lunch: null,
      dinner: null,
      snack: null,
    };
    expect(component.checkMealPlan(mealPlan)).toBe(false);
  });

  it('should dispatch RemoveFromMealPlan and ShowError actions when removeFromMealPlan is called', () => {
    const profile: IProfile = {
      username: 'test',
      savedRecipes: [],
      createdRecipes: [],
      currMealPlan: {
        username: 'test',
        date: '2022-10-01',
        breakfast: { recipeId: '1' } as IRecipeDesc,
        lunch: null,
        dinner: null,
        snack: null,
      },
      email: '',
      displayName: '',
      profilePic: '',
      ingredients: []
    };

    const mealPlan = {
      username: 'test',
      date: '2022-10-01',
      breakfast: null,
      lunch: null,
      dinner: null,
      snack: null,
    }
    component.profile = profile;
    component.recipe = { recipeId: '1' };
    jest.spyOn(component.mealPlan$, 'pipe').mockReturnValue(of(null));
    component.removeFromMealPlan();
    expect(store.dispatch).toHaveBeenCalledWith(new RemoveFromMealPlan('test', '1'));
    expect(store.dispatch).toHaveBeenCalledWith(new ShowError('Error: Something is wrong with the mealPlan'));
    expect(component.added).toBe(false);
  });

  it('should dispatch RemoveFromMealPlan and UpdateProfile actions when removeFromMealPlan is called', () => {
    const profile: IProfile = {
      username: 'test',
      savedRecipes: [],
      createdRecipes: [],
      currMealPlan: {
        username: 'test',
        date: '2022-10-01',
        breakfast: { recipeId: '1' } as IRecipeDesc,
        lunch: null,
        dinner: null,
        snack: null,
      },
      email: '',
      displayName: '',
      profilePic: '',
      ingredients: []
    };

    const mealPlan = {
      username: 'test',
      date: '2022-10-01',
      breakfast: null,
      lunch: null,
      dinner: null,
      snack: null,
    }
    component.profile = profile;
    component.recipe = { recipeId: '1' };
    jest.spyOn(component.mealPlan$, 'pipe').mockReturnValue(of(mealPlan));
    component.removeFromMealPlan();
    expect(store.dispatch).toHaveBeenCalledWith(new RemoveFromMealPlan('test', '1'));
    expect(store.dispatch).toHaveBeenCalledWith(new UpdateProfile(profile));
    expect(component.added).toBe(false);
  });
});

