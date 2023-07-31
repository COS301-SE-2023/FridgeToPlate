import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipePage } from './recipe.page';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { RecipeUIModule } from '@fridge-to-plate/app/recipe/ui';
import { NavigationBarModule } from '@fridge-to-plate/app/navigation/feature';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { of, throwError } from 'rxjs';
import { Location } from '@angular/common';
import { RecipeAPI } from '@fridge-to-plate/app/recipe/data-access';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { NgxsModule, Store } from '@ngxs/store';
import { ReviewModule } from '@fridge-to-plate/app/review/feature';
import { Navigate } from '@ngxs/router-plugin';
describe('RecipeDetailPageComponent', () => {
  let location: Location;
  let component: RecipePage;
  let fixture: ComponentFixture<RecipePage>;
  const testRecipe: IRecipe = {
    recipeId: "test-id",
    name: "Test Recipe",
    difficulty: "Easy",
    recipeImage: "url.com/image",
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
      declarations: [RecipePage],
      imports: [ReviewModule, IonicModule, HttpClientModule, RouterTestingModule, RecipeUIModule, NavigationBarModule, NgxsModule.forRoot()],
      providers: [HttpClientModule]
    })
    .compileComponents();

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
    jest.spyOn(component, 'setRecipe').mockImplementation((id: string) => component.recipe = testRecipe);
    component.setRecipe("test-id");
    expect(component.recipe).toEqual(testRecipe);
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

  // it('should retrieve recipe data correctly in setRecipe', () => {
  //   const recipeService: RecipeAPI = TestBed.inject(RecipeAPI);
  //   const getRecipeByIdSpy = jest.spyOn(recipeService, 'getRecipeById').mockReturnValue(of(testRecipe));

  //   component.setRecipe('test-id');

  //   expect(getRecipeByIdSpy).toHaveBeenCalledWith('test-id');
  //   expect(component.recipe).toEqual(testRecipe);
  // });

  // it('should handle error when retrieving recipe data', () => {
  //   const recipeService: RecipeAPI = TestBed.inject(RecipeAPI);
  //   const getRecipeByIdSpy = jest.spyOn(recipeService, 'getRecipeById').mockReturnValue(throwError('Error'));

  //   component.setRecipe('test-id');

  //   expect(getRecipeByIdSpy).toHaveBeenCalledWith('test-id');
  //   expect(component.recipe).toBeUndefined();
  //   expect(component.errorMessage).toBe('Error retrieving recipe data.');
  // });

it('should not retrieve recipe data with empty id', () => {
  component.recipe = undefined;
  const recipeService: RecipeAPI = TestBed.inject(RecipeAPI);
  const getRecipeByIdSpy = jest.spyOn(recipeService, 'getRecipeById');

  component.setRecipe('');

  expect(getRecipeByIdSpy).not.toHaveBeenCalled();
  expect(component.recipe).toBeUndefined();
});

it('Should go to the Home Page', () => {
  const dispatchSpy = jest.spyOn(TestBed.inject(Store), 'dispatch');
  component.goHome();
  expect(dispatchSpy).toHaveBeenCalledWith(new Navigate(['/home']));
})

});
