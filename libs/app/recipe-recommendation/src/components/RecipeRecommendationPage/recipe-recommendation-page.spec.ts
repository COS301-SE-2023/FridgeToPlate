import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeRecommendationPage } from './recipe-recommendation-page';
import { AppRecipeRecommendationModule} from "@fridge-to-plate/app/recipe-recommendation";

describe('RecipeRecommendationPage', () => {
  let component: RecipeRecommendationPage;
  let fixture: ComponentFixture<RecipeRecommendationPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeRecommendationPage]
    });
    fixture = TestBed.createComponent(RecipeRecommendationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
