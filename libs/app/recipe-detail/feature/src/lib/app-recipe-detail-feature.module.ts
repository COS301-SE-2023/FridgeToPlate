import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { appRecipeDetailFeatureRoutes } from './lib.routes';
import {RecipeDetailPageComponent} from "./recipe-detail-page/recipe-detail-page.component";
import {AppRecipeDetailUiModule} from "@fridge-to-plate/app/recipe-detail/ui";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRecipeDetailFeatureRoutes),
    RouterModule.forChild(appRecipeDetailFeatureRoutes),
    AppRecipeDetailUiModule
  ],
  declarations: [RecipeDetailPageComponent]
})
export class AppRecipeDetailFeatureModule {}
