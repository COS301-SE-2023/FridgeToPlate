import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipePreferencesStep } from './recipe-preferences-step';

describe('RecipePreferencesStep', () => {
  let component: RecipePreferencesStep;
  let fixture: ComponentFixture<RecipePreferencesStep>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipePreferencesStep]
    });
    fixture = TestBed.createComponent(RecipePreferencesStep);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
