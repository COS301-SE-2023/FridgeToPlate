import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipePage } from "./recipe.page";
import { RecipeUIModule } from "@fridge-to-plate/app/recipe/ui";
import { IonicModule } from "@ionic/angular";
import { RecipeRouting } from './recipe.routing';

@NgModule({
  imports: [
    CommonModule,
    RecipeUIModule,
    IonicModule,
    RecipeRouting,

  ],
  declarations: [RecipePage]
})
export class RecipeModule {}
