import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipePreferencesStep } from './recipe-preferences-step';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { RecommendUIModule } from '../recommend.module';
import { NgxsModule } from '@ngxs/store';

describe('RecipePreferencesStep', () => {
  let component: RecipePreferencesStep;
  let fixture: ComponentFixture<RecipePreferencesStep>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipePreferencesStep],
      imports: [IonicModule, HttpClientModule, RecommendUIModule, NgxsModule.forRoot()],
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
