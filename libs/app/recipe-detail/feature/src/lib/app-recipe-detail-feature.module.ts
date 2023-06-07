import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { appRecipeDetailFeatureRoutes } from './lib.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRecipeDetailFeatureRoutes),
    RouterModule.forChild(appRecipeDetailFeatureRoutes),
  ],
})
export class AppRecipeDetailFeatureModule {}
