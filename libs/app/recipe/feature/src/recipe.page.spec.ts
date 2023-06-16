import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipePage } from './recipe.page';

describe('RecipeDetailPageComponent', () => {
  let component: RecipePage;
  let fixture: ComponentFixture<RecipePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipePage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
