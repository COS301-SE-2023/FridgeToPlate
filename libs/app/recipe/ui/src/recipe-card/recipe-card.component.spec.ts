import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeCardComponent } from './recipe-card.component';
import { IonicModule } from '@ionic/angular';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { HttpClientModule } from '@angular/common/http';

describe('RecipeCardComponent', () => {
  const mockProfileAPI = {
    editProfile: jest.fn(),
  };

  let component: RecipeCardComponent;
  let fixture: ComponentFixture<RecipeCardComponent>;
  const testRecipe: IRecipe = {
    recipeId: 'test-id',
    name: 'Pizza',
    recipeImage: 'image-url',
    difficulty: 'Easy',
    ingredients: [
      {
        ingredientId: 'test-id',
        name: 'Carrot',
        unit: 'ml',
        amount: 10,
      },
    ],
    description: 'Heading',
    tags: ['Paleo'],
    numberOfServings: 2,
    prepTime: 30,
    meal: 'Snack',
    steps: ['Chop onions'],
    creator: "Kristap P",
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

  it('should be saved', () => {
    component.changeSaved();
    expect(component.bookmarked).toEqual(true);
  });

  it('should be unsaved', () => {
    mockProfileAPI.editProfile.mockReturnValue(true);

    const testProfile = {
      saved_recipes: [],
    };

    component.profile = testProfile;
    component.bookmarked = true;
    component.changeSaved();

    expect(component.bookmarked).toEqual(false);
  });
});
