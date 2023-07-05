import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { IonicModule } from '@ionic/angular';
import { TempRecipeCardComponent } from './temp-recipe-card/temp-recipe-card.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [
    RecipeCardComponent, 
    TempRecipeCardComponent,
  ],
  exports: [
    RecipeCardComponent,
    TempRecipeCardComponent,
  ],
})
export class RecipeUIModule {}
