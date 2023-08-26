import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemEditStep } from './item-edit-step/item-edit-step';
import { RecipeListStep } from './recipe-list-step/recipe-list-step';
import { RecipePreferencesStep } from './recipe-preferences-step/recipe-preferences-step';
import { StepperForm } from './stepper-form/stepper-form';
import { NzListModule } from 'ng-zorro-antd/list';
import { IonicModule } from '@ionic/angular';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { RecipeUIModule } from '@fridge-to-plate/app/recipe/ui';
import { RecommendDataAccessModule } from '@fridge-to-plate/app/recommend/data-access';
import { FormsModule } from '@angular/forms';
import { IngredientUIModule } from '@fridge-to-plate/app/ingredient/ui';
import { ProfileDataAccessModule } from '@fridge-to-plate/app/profile/data-access';
import { BarcodeScannerLivestreamModule } from "ngx-barcode-scanner";

@NgModule({
  declarations: [
    ItemEditStep,
    RecipeListStep,
    RecipePreferencesStep,
    StepperForm,
  ],
  imports: [
    CommonModule,
    NzListModule,
    IonicModule,
    NzStepsModule,
    RecipeUIModule,
    RecommendDataAccessModule,
    FormsModule,
    IngredientUIModule,
    ProfileDataAccessModule,
    BarcodeScannerLivestreamModule
  ],
  exports: [ItemEditStep, RecipeListStep, RecipePreferencesStep, StepperForm],
})
export class RecommendUIModule {}
