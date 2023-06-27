import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeCardComponent } from './recipe-card.component';
import { IonicModule } from '@ionic/angular';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { HttpClientModule } from '@angular/common/http';
import { ProfileAPI } from '@fridge-to-plate/app/profile/data-access';

describe('RecipeCardComponent', () => {
  const mockProfileAPI = {
    editProfile: jest.fn(),
  };

  let component: RecipeCardComponent;
  let fixture: ComponentFixture<RecipeCardComponent>;
  let testRecipe: IRecipe;

  testRecipe = {
    recipeId: 'test-id',
    name: 'Pizza',
    recipeImage: 'image-url',
    difficulty: 'easy',
    ingredients: [
      {
        ingredientId: 'test-id',
        name: 'Carrot',
      },
    ],
    instructions: [
      {
        instructionHeading: 'Heading',
        instructionBody: 'Body',
      },
    ],
    tags: ['Paleo'],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeCardComponent],
      imports: [IonicModule, HttpClientModule],
      providers: [{ provide: ProfileAPI, useValue: mockProfileAPI }],
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
