import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { appRecipeDetailFeatureRoutes } from './lib.routes';
import {RecipeDetailPageComponent} from "./recipe-detail-page/recipe-detail-page.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRecipeDetailFeatureRoutes),
    RouterModule.forChild(appRecipeDetailFeatureRoutes),
  ],
  declarations: [RecipeDetailPageComponent]
})
export class AppRecipeDetailFeatureModule {}
