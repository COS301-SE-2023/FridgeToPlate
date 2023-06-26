import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipePage } from './recipe.page';

const routes: Routes = [
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   component: RecipePage,
  // },
  {
    path: ':id',
    pathMatch: 'full',
    component: RecipePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeRouting {}
