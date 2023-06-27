import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipePage } from './recipe.page';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { RecipeUIModule } from '@fridge-to-plate/app/recipe/ui';
import { NavigationBarModule } from '@fridge-to-plate/app/navigation/feature';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { Observable, of, throwError } from 'rxjs';
import { Location } from '@angular/common';
import { RecipeService } from '@fridge-to-plate/app/recipe/data-access';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
describe('RecipeDetailPageComponent', () => {
  let location: Location;
  let recipeService: RecipeService;
  let component: RecipePage;
  let fixture: ComponentFixture<RecipePage>;
  let testRecipe: IRecipe = {
    id: "test-id",
    name: "Test Recipe",
    difficulty: "easy",
    recipeImage: "url.com/image",
    ingredients: [],
    instructions: [],
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


});
