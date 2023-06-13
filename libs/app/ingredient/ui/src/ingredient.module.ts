import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientCardComponent } from './ingredient-card/ingredient-card.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [IngredientCardComponent],
  exports: [IngredientCardComponent]
})
export class IngredientUIModule {}
