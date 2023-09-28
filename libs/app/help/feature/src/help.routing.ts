import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecommendPage } from "./help.page";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RecommendPage
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class RecommendRouting {}
