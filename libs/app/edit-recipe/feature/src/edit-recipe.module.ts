import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { EditRecipeRouting } from './edit-recipe.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditRecipeComponent } from './edit-recipe.page';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    EditRecipeRouting,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [EditRecipeComponent]
})
export class EditRecipeModule {}
