import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './home.page';
import { HomeRouting } from './home.routing'
import { RecipeUIModule } from '@fridge-to-plate/app/recipe/ui';
import { HomeDataAccessModule } from '../../data-access/src/home.module';

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
