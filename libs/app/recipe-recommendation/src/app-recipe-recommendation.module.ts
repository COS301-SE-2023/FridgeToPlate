import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeRecommendationPage } from "./components/RecipeRecommendationPage/recipe-recommendation-page";
import {RecommendationRouting} from "./recommendation.routing";
import {IonicModule} from "@ionic/angular";
import {StepperForm} from "./components/stepper-form/stepper-form";

@NgModule({
  declarations: [RecipeRecommendationPage, StepperForm],
  imports: [CommonModule, RecommendationRouting, IonicModule],
})
export class AppRecipeRecommendationModule {}
