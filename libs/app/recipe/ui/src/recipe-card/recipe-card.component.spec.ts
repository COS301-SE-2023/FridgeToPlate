import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeCardComponent } from './recipe-card.component';
import { IonicModule } from '@ionic/angular';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { HttpClientModule } from '@angular/common/http';

describe('RecipeCardComponent', () => {
  let component: RecipeCardComponent;
  let fixture: ComponentFixture<RecipeCardComponent>;
  let testRecipe : IRecipe;

  testRecipe = {
    recipeId: "test-id",
    name: "Pizza",
    recipeImage: "image-url",
    difficulty: "easy",
    ingredients: [
      {
        ingredientId: "test-id", 
        name: "Carrot"
      }
    ],
    instructions: [
      {
        instructionHeading: "Heading", 
        instructionBody: "Body"
      }
    ],
    tags: [
      "Paleo"
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeCardComponent],
      imports: [IonicModule, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeCardComponent);
    component = fixture.componentInstance;
    component.recipe = testRecipe;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
