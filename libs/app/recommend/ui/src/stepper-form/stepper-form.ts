import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GetRecipeRecommendations } from '@fridge-to-plate/app/recommend/utils';
import { Store } from '@ngxs/store';

@Component({
  selector: 'stepper-form',
  templateUrl: './stepper-form.html',
  styleUrls: ['./stepper-form.scss'],
})
export class StepperForm {
  currentStep = 1;

  recipeRecommendForm!: FormGroup;

  stepContent = `Edit Your Ingredients`;
  stepContentDesktop = `Edit Your Ingredients and Preferences`;

  recipePreferencesForm!: FormGroup;

  constructor(private store: Store) {}

  changeContent(): void {
    switch (this.currentStep) {
      case 1: {
        this.stepContent = 'Edit Your Ingredients';
        this.stepContentDesktop = `Edit Your Ingredients and Preferences`;
        break;
      }
      case 2: {
        this.stepContent = 'Choose Preferences';
        this.stepContentDesktop = `Recipe Suggestions`;
        break;
      }
      case 3: {
        this.stepContent = 'Suggestions';
        this.stepContentDesktop = `error`;
        break;
      }
      default: {
        this.stepContent = 'error';
        this.stepContentDesktop = `error`;
      }
    }
  }

  previousStep(): void {
    if (this.currentStep <= 1) return;
    this.currentStep -= 1;
    this.changeContent();
  }

  nextStep(): void {
    if (this.currentStep >= 3) return;
    this.currentStep += 1;
    this.changeContent();
  }

  attemptRecommendation(): void {
    this.store.dispatch(new GetRecipeRecommendations());
    this.currentStep += 1;
    this.changeContent();
  }
}
