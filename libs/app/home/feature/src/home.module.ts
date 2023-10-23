/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './home.page';
import { HomeRouting } from './home.routing'
import { RecipeUIModule } from '@fridge-to-plate/app/recipe/ui';
import { HomeDataAccessModule } from '@fridge-to-plate/app/home/data-access';

@NgModule({
  imports: [
    CommonModule,
    HomeRouting,
    RecipeUIModule,
    HomeDataAccessModule
  ],
  declarations: [HomePage],
})
export class HomeModule {}
