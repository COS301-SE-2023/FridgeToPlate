import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipePage } from './recipe.page';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { RecipeUIModule } from '@fridge-to-plate/app/recipe/ui';
import { NavigationBarModule } from '@fridge-to-plate/app/navigation/feature';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { of, throwError } from 'rxjs';
import { Location } from '@angular/common';
import { RecipeService } from '@fridge-to-plate/app/recipe/data-access';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
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
      imports: [IonicModule, HttpClientModule, RouterTestingModule, RecipeUIModule, NavigationBarModule],
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

  it('should retrieve recipe data correctly in setRecipe', () => {
    const recipeService: RecipeService = TestBed.inject(RecipeService);
    const getRecipeByIdSpy = jest.spyOn(recipeService, 'getRecipeById').mockReturnValue(of(testRecipe));

    component.setRecipe('test-id');

    expect(getRecipeByIdSpy).toHaveBeenCalledWith('test-id');
    expect(component.recipe).toEqual(testRecipe);
  });

  it('should handle error when retrieving recipe data', () => {
    const recipeService: RecipeService = TestBed.inject(RecipeService);
    const getRecipeByIdSpy = jest.spyOn(recipeService, 'getRecipeById').mockReturnValue(throwError('Error'));

    component.setRecipe('test-id');

    expect(getRecipeByIdSpy).toHaveBeenCalledWith('test-id');
    expect(component.recipe).toBeUndefined();
    expect(component.errorMessage).toBe('Error retrieving recipe data.');
  });

it('should not retrieve recipe data with empty id', () => {
  const recipeService: RecipeService = TestBed.inject(RecipeService);
  const getRecipeByIdSpy = jest.spyOn(recipeService, 'getRecipeById');

  component.setRecipe('');

  expect(getRecipeByIdSpy).not.toHaveBeenCalled();
  expect(component.recipe).toBeUndefined();
});

});
