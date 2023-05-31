import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecommendPage } from "./recommend.page";

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
export class RecommendationRouting {}
