import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { EditRecipeRouting } from './edit-recipe.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditRecipeComponent } from './edit-recipe.page';
import { RecipeDataAccessModule } from '@fridge-to-plate/app/recipe/data-access';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { RecipeModule } from '@fridge-to-plate/app/recipe/feature';
import { NgxsModule } from '@ngxs/store';
import {RecipeState as EditRecipeState } from '@fridge-to-plate/app/edit-recipe/data-access'


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    EditRecipeRouting,
    ReactiveFormsModule,
    FormsModule,
    RecipeDataAccessModule,
    RecipeModule,
    RecipeDataAccessModule,
    NgxsModule.forFeature([EditRecipeState])
  ],
  declarations: [EditRecipeComponent]
})
export class EditRecipeModule {}
