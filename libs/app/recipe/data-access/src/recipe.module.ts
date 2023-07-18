import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxsModule} from "@ngxs/store";
import {RecipeState} from "./recipe.state";

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([RecipeState])],
})
export class RecipeDataAccessModule {}
