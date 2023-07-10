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
import { RecommendDataAccessModule } from '../../data-access/src/recommend.module';
import { RecommendApi } from '../../data-access/src/recommend.api';
import { FormsModule } from '@angular/forms';
import { DietPreferencePillComponentComponent } from './diet-preferences-pill-component/diet-preferences-pill-component.component';

@NgModule({
  declarations: [
    ItemEditStep,
    RecipeListStep,
    RecipePreferencesStep,
    StepperForm,
    DietPreferencePillComponentComponent,
  ],
  imports: [
    CommonModule,
    NzListModule,
    IonicModule,
    NzStepsModule,
    RecipeUIModule,
    RecommendDataAccessModule,
    FormsModule,
  ],
  exports: [ItemEditStep, RecipeListStep, RecipePreferencesStep, StepperForm],
})
export class RecommendUIModule {}
