import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeListStep } from './recipe-list-step';

describe('RecipeListStep', () => {
  let component: RecipeListStep;
  let fixture: ComponentFixture<RecipeListStep>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeListStep]
    });
    fixture = TestBed.createComponent(RecipeListStep);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
