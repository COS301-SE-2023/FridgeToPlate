import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeRecommendationPage } from "./components/RecipeRecommendationPage/recipe-recommendation-page";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RecipeRecommendationPage
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class RecommendationRouting {}
