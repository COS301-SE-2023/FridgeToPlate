import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipePreferencesStep } from './recipe-preferences-step';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { RecommendModule } from '@fridge-to-plate/app/recommend/feature';
import { RecommendUIModule } from '../recommend.module';

describe('RecipePreferencesStep', () => {
  let component: RecipePreferencesStep;
  let fixture: ComponentFixture<RecipePreferencesStep>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipePreferencesStep],
      imports: [IonicModule, HttpClientModule, RecommendUIModule],
      providers: [HttpClientModule],
    });
    fixture = TestBed.createComponent(RecipePreferencesStep);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
