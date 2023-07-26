import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipePage } from './recipe.page';
import { RecipeUIModule } from '@fridge-to-plate/app/recipe/ui';
import { IonicModule } from '@ionic/angular';
import { RecipeRouting } from './recipe.routing';
import { NavigationBarModule } from '@fridge-to-plate/app/navigation/feature';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ReviewModule } from '@fridge-to-plate/app/review/feature';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { RecipeDataAccessModule } from '@fridge-to-plate/app/recipe/data-access';

@NgModule({
  imports: [
    CommonModule,
    RecipeUIModule,
    IonicModule,
    RecipeRouting,
    NavigationBarModule,
    ReviewModule,
    RecipeDataAccessModule,
  ],
  declarations: [RecipePage],
})
export class RecipeModule {}
