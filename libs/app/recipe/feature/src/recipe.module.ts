import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipePage } from "./recipe.page";
import { RecipeUIModule } from "@fridge-to-plate/app/recipe/ui";
import { IonicModule } from "@ionic/angular";
import { RecipeRouting } from './recipe.routing';
import { NavigationBarModule } from '@fridge-to-plate/app/navigation/feature'

@NgModule({
  imports: [
    CommonModule,
    RecipeUIModule,
    IonicModule,
    RecipeRouting,
    NavigationBarModule

  ],
  declarations: [RecipePage]
})
export class RecipeModule {}
