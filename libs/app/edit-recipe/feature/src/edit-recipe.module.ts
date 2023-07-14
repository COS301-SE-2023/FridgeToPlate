import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { EditRecipeRouting } from './edit-recipe.routing';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    EditRecipeRouting
  ],
})
export class EditRecipeModule {}
