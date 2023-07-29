import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './home.page';
import { HomeRouting } from './home.routing'
import { RecipeUIModule } from '@fridge-to-plate/app/recipe/ui';

@NgModule({
  imports: [
    CommonModule,
    HomeRouting,
    RecipeUIModule
  ],
  declarations: [HomePage],
})
export class HomeModule {}
