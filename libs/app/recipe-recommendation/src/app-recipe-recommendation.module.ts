import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeRecommendationPage } from "./components/RecipeRecommendationPage/recipe-recommendation-page";
import {RecommendationRouting} from "./recommendation.routing";

@NgModule({
  declarations: [RecipeRecommendationPage],
  imports: [CommonModule, RecommendationRouting],
})
export class AppRecipeRecommendationModule {}
