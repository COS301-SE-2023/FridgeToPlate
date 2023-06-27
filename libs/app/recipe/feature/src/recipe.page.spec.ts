import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipePage } from './recipe.page';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { RecipeUIModule } from '@fridge-to-plate/app/recipe/ui';
import { NavigationBarModule } from '@fridge-to-plate/app/navigation/feature';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { Observable } from 'rxjs';
describe('RecipeDetailPageComponent', () => {
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should observe recipe details', () => {
    jest.spyOn(component, 'setRecipe').mockImplementation((id: string) => component.recipe = testRecipe);
    component.setRecipe("test-id");
    expect(component.recipe).toEqual(testRecipe);
  });
});
