import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperForm } from './stepper-form';
import { IonicModule } from '@ionic/angular';
import { RecommendUIModule } from '../recommend.module';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { RecipeUIModule } from '@fridge-to-plate/app/recipe/ui';
import { RecommendDataAccessModule } from '@fridge-to-plate/app/recommend/data-access';
import { FormsModule } from '@angular/forms';
import { ItemEditStep } from '../item-edit-step/item-edit-step';
import { RecipeListStep } from '../recipe-list-step/recipe-list-step';
import { RecipePreferencesStep } from '../recipe-preferences-step/recipe-preferences-step';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('StepperForm', () => {
  let component: StepperForm;
  let fixture: ComponentFixture<StepperForm>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ItemEditStep,
        RecipeListStep,
        RecipePreferencesStep,
        StepperForm,
      ],
      imports: [
        NzListModule,
        IonicModule,
        NzStepsModule,
        RecipeUIModule,
        RecommendDataAccessModule,
        FormsModule,
        HttpClientTestingModule,
      ],
    });
    fixture = TestBed.createComponent(StepperForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create on first step', () => {
    expect(component.currentStep).toBe(1);
    expect(component.stepContent).toBe('Edit Fridge Items');
  });

  it('should not go one step back when on first step', () => {
    component.previousStep();
    expect(component.currentStep).toBe(1);
    expect(component.stepContent).toBe('Edit Fridge Items');
  });

  it('should go one step forward on nextStep', () => {
    component.nextStep();
    expect(component.currentStep).toBe(2);
    expect(component.stepContent).toBe('Verify Preferences');
  });

  it('should not go one step forward on nextStep at last step', () => {
    component.nextStep();
    component.nextStep();
    component.nextStep();
    expect(component.currentStep).toBe(3);
    expect(component.stepContent).toBe('Suggestions');
  });
});
