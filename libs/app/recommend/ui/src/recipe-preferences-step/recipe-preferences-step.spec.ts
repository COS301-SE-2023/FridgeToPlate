import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipePreferencesStep } from './recipe-preferences-step';
import { IonicModule } from '@ionic/angular';

describe('RecipePreferencesStep', () => {
  let component: RecipePreferencesStep;
  let fixture: ComponentFixture<RecipePreferencesStep>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipePreferencesStep],
      imports: [IonicModule],
    });
    fixture = TestBed.createComponent(RecipePreferencesStep);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
