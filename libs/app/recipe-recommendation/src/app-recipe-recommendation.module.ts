import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeRecommendationPage } from "./components/RecipeRecommendationPage/recipe-recommendation-page";
import {RecommendationRouting} from "./recommendation.routing";
import {IonicModule} from "@ionic/angular";
import {StepperForm} from "./components/stepper-form/stepper-form";
import {NzStepsModule} from "ng-zorro-antd/steps";
import {ItemEditStep} from "./components/item-edit-step/item-edit-step";
import {RecipePreferencesStep} from "./components/recipe-preferences-step/recipe-preferences-step";
import {RecipeListStep} from "./components/recipe-list-step/recipe-list-step";
import {NzListModule} from "ng-zorro-antd/list";
import {ReactiveFormsModule} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";

@NgModule({
  declarations: [RecipeRecommendationPage, StepperForm, ItemEditStep, RecipePreferencesStep, RecipeListStep],
  imports: [CommonModule, RecommendationRouting, IonicModule, NzStepsModule, NzListModule, ReactiveFormsModule, NzFormModule, NzInputModule],
})
export class AppRecipeRecommendationModule {}
