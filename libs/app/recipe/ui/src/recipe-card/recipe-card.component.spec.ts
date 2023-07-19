import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeCardComponent } from './recipe-card.component';
import { IonicModule } from '@ionic/angular';
import { IRecipe, IRecipeDesc } from '@fridge-to-plate/app/recipe/utils';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router'; 
import { NgxsModule, State, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { IProfile, SaveRecipe, RemoveSavedRecipe } from '@fridge-to-plate/app/profile/utils';
import { RouterTestingModule } from '@angular/router/testing';
import { ShowError } from '@fridge-to-plate/app/error/utils';

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
  
});

