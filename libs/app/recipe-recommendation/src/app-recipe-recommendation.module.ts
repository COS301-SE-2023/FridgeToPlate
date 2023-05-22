import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeRecommendationPage } from "./components/RecipeRecommendationPage/recipe-recommendation-page";
import {RecommendationRouting} from "./recommendation.routing";
import {IonicModule} from "@ionic/angular";
import {StepperForm} from "./components/stepper-form/stepper-form";
import {NzStepsModule} from "ng-zorro-antd/steps";
import {ItemEditStep} from "./components/item-edit-step/item-edit-step";

@NgModule({
  declarations: [RecipeRecommendationPage, StepperForm, ItemEditStep],
  imports: [CommonModule, RecommendationRouting, IonicModule, NzStepsModule],
})
export class AppRecipeRecommendationModule {}