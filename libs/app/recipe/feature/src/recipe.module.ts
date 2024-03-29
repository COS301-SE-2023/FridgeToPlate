/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipePage } from './recipe.page';
import { RecipeUIModule } from '@fridge-to-plate/app/recipe/ui';
import { IonicModule } from '@ionic/angular';
import { RecipeRouting } from './recipe.routing';
import { NavigationBarModule } from '@fridge-to-plate/app/navigation/feature';
import { ReviewModule } from '@fridge-to-plate/app/review/feature';
import { RecipeDataAccessModule } from '@fridge-to-plate/app/recipe/data-access';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RecipeUIModule,
    IonicModule,
    RecipeRouting,
    NavigationBarModule,
    ReviewModule,
    RecipeDataAccessModule,
    FormsModule
  ],
  declarations: [RecipePage],
})
export class RecipeModule {}
