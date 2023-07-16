import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeCardComponent } from './recipe-card.component';
import { IonicModule } from '@ionic/angular';
import { IRecipe, IRecipeDesc } from '@fridge-to-plate/app/recipe/utils';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule, State, Store } from '@ngxs/store';
import { IProfile, RemoveSavedRecipe, SaveRecipe } from '@fridge-to-plate/app/profile/utils';
import { Injectable } from '@angular/core';

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
  };

  @State({ 
    name: 'profile', 
    defaults: {
      profile: testProfile
    } 
  }) 
  @Injectable()
  class MockProfileState {}

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
      imports: [IonicModule, HttpClientModule, NgxsModule.forRoot([MockProfileState])],
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
    component.changeSaved();
    expect(dispatchSpy).toBeCalledWith(new SaveRecipe(component.recipe as IRecipeDesc));
  });

  it('should be unsaved', () => {
    component.bookmarked = true;
    component.changeSaved();
    expect(dispatchSpy).toBeCalledWith(new RemoveSavedRecipe(component.recipe as IRecipeDesc));
  });
});
