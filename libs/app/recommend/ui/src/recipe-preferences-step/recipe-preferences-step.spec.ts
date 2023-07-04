import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipePreferencesStep } from './recipe-preferences-step';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { RecommendModule } from '@fridge-to-plate/app/recommend/feature';
import { RecommendUIModule } from '../recommend.module';
import { RecommendApi } from 'libs/app/recommend/data-access/src/recommend.api';

describe('RecipePreferencesStep', () => {
  let component: RecipePreferencesStep;
  let fixture: ComponentFixture<RecipePreferencesStep>;
  let dietlListService: RecommendApi;

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

  it('should return 4 diets', () => {
    component.dietList$.subscribe((next) => {
      expect(next.length).toBe(4);
    });
  });

  it('should add a selected diet to list of selected diets', () => {
    component.dietList$.subscribe((next) => {
      let dietList = next;
      component.dietSelect('Vegan');
      expect(component.dietCategories).toContain('Vegan');
    });
  });
});
