import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeInfoCardComponent } from './recipe-info-card/recipe-info-card.component';

@NgModule({
  imports: [CommonModule],
  declarations: [RecipeInfoCardComponent],
  exports: [RecipeInfoCardComponent],
})
export class AppRecipeDetailUiModule {}
