import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemEditStep } from './item-edit-step/item-edit-step';
import { RecipeListStep } from './recipe-list-step/recipe-list-step';
import { RecipePreferencesStep } from './recipe-preferences-step/recipe-preferences-step';
import { StepperForm } from './stepper-form/stepper-form';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ItemEditStep,
    RecipeListStep,
    RecipePreferencesStep,
    StepperForm
  ],
  exports: [
    ItemEditStep,
    RecipeListStep,
    RecipePreferencesStep,
    StepperForm
  ],
})
export class RecommendUIModule {}
