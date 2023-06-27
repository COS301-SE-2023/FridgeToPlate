import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipePage } from './recipe.page';
import {RecipeErrorComponent} from "./lib/recipe-error/recipe-error.component";

const routes: Routes = [
  {
    path: ':id',
    pathMatch: 'full',
    component: RecipePage,
  },
  {
    path: '**',
    pathMatch: 'full',
    component: RecipeErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeRouting {}
