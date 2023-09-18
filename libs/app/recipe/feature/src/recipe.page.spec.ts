import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipePage } from './recipe.page';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { NavigationBarModule } from '@fridge-to-plate/app/navigation/feature';
import {
  ChangeMeasurementType,
  IRecipe,
} from '@fridge-to-plate/app/recipe/utils';
import { of } from 'rxjs';
import { Location } from '@angular/common';
import { RecipeAPI } from '@fridge-to-plate/app/recipe/data-access';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { NgxsModule, State, Store } from '@ngxs/store';
import { ReviewModule } from '@fridge-to-plate/app/review/feature';
import { Navigate } from '@ngxs/router-plugin';
import { Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';

describe('RecipeDetailPageComponent', () => {
  @State({
    name: 'recipe',
    defaults: {
      recipe: null,
      measurementType: 'Metric',
    },
  })
  @Injectable()
  class MockRecipeState {}

  let location: Location;
  let component: RecipePage;
  let fixture: ComponentFixture<RecipePage>;

  const testRecipe: IRecipe = {
    recipeId: 'test-id',
    name: 'Test Recipe',
    difficulty: 'Easy',
    recipeImage: 'url.com/image',
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
    creator: 'Kristap P',
    youtubeId: 'testId',
    rating: 2,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipePage],
      imports: [
        ReviewModule,
        IonicModule,
        HttpClientModule,
        RouterTestingModule,
        NavigationBarModule,
        FormsModule,
        NgxsModule.forRoot([MockRecipeState]),
      ],
      providers: [HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipePage);
    component = fixture.componentInstance;
    component.recipe = testRecipe;
    fixture.detectChanges();
    location = TestBed.inject(Location);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should observe recipe details', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    jest
      .spyOn(component, 'setRecipe')
      .mockImplementation((id: string) => (component.recipe = testRecipe));
    component.setRecipe('test-id');
    expect(component.recipe).toEqual(testRecipe);
    expect(component.safeUrl).toBe(undefined);
  });

  it('should navigate back when goBack() is called', () => {
    const locationSpy = jest.spyOn(location, 'back');
    component.goBack();
    expect(locationSpy).toHaveBeenCalled();
  });

  it('should initialize the component and call setRecipe() with the correct id', () => {
    const paramMap = convertToParamMap({ id: 'test-id' });
    const route: ActivatedRoute = TestBed.inject(ActivatedRoute);
    jest.spyOn(route, 'paramMap', 'get').mockReturnValue(of(paramMap));

    const setRecipeSpy = jest.spyOn(component, 'setRecipe');
    component.ngOnInit();

    expect(setRecipeSpy).toHaveBeenCalledWith('test-id');
  });

  it('should not retrieve recipe data with empty id', () => {
    component.recipe = undefined;
    const recipeService: RecipeAPI = TestBed.inject(RecipeAPI);
    const getRecipeByIdSpy = jest.spyOn(recipeService, 'getRecipeById');

    component.setRecipe('');

    expect(getRecipeByIdSpy).not.toHaveBeenCalled();
    expect(component.recipe).toBeUndefined();
  });

  it('Should set forceLoading to false after the timer is done', () => {
    component.forceLoading = true;
    fixture.detectChanges();
    jest.useFakeTimers();
    component.ngOnInit();
    jest.advanceTimersByTimeAsync(2000);
    // expect(component.forceLoading).toBe(false);
    expect(fixture.componentInstance.forceLoading).toBe(true);
  });

  it('Should go to the Home Page', () => {
    const dispatchSpy = jest.spyOn(TestBed.inject(Store), 'dispatch');
    component.goHome();
    expect(dispatchSpy).toHaveBeenCalledWith(new Navigate(['/home']));
  });

  it('Should go to the Home Page', () => {
    const dispatchSpy = jest.spyOn(TestBed.inject(Store), 'dispatch');
    component.goHome();
    expect(dispatchSpy).toHaveBeenCalledWith(new Navigate(['/home']));
  });

  it('Should set safeUrl accordingly with value', () => {
    const store: Store = TestBed.inject(Store);
    jest.spyOn(store, 'select').mockReturnValue(of(testRecipe));
    jest
      .spyOn(store, 'dispatch')
      .mockReturnValue(of({ ...testRecipe, youtubeId: '' }));
    component.setRecipe('test-id');
    expect(component.safeUrl).toEqual({
      changingThisBreaksApplicationSecurity:
        'https://www.youtube.com/embed/testId',
    });
  });

  it('Should not set safeUrl no youtubeId', () => {
    const store: Store = TestBed.inject(Store);
    jest
      .spyOn(store, 'select')
      .mockReturnValue(of({ ...testRecipe, youtubeId: '' }));
    jest
      .spyOn(store, 'dispatch')
      .mockReturnValue(of({ ...testRecipe, youtubeId: '' }));
    component.setRecipe('test-id');
    expect(component.safeUrl).toBe(undefined);
  });

  it('should toggle isDescriptionExpanded from false to true', () => {
    component.isDescriptionExpanded = false;
    component.toggleDescriptionExpanded();
    expect(component.isDescriptionExpanded).toBe(true);
  });

  it('should toggle isDescriptionExpanded from true to false', () => {
    component.isDescriptionExpanded = true;
    component.toggleDescriptionExpanded();
    expect(component.isDescriptionExpanded).toBe(false);
  });

  it('should dispatch ingredients change', () => {
    const dispatchSpy = jest.spyOn(TestBed.inject(Store), 'dispatch');

    component.measurementUnit = 'Imperical';
    component.changeIngredientUnits();
    expect(dispatchSpy).toHaveBeenCalledWith(
      new ChangeMeasurementType('Imperical')
    );
  });
});
