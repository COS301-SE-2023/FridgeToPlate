import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeInfoCardComponent } from './recipe-info-card/recipe-info-card.component';
import {IonicModule} from "@ionic/angular";

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [RecipeInfoCardComponent],
  exports: [RecipeInfoCardComponent],
})
export class AppRecipeDetailUiModule {}
