import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeRecommendationPage } from "./components/RecipeRecommendationPage/recipe-recommendation-page";
import {RecommendationRouting} from "./recommendation.routing";
import {IonicModule} from "@ionic/angular";

@NgModule({
  declarations: [RecipeRecommendationPage],
  imports: [CommonModule, RecommendationRouting, IonicModule],
})
export class AppRecipeRecommendationModule {}
