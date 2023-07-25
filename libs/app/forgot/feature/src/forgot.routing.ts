import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPage } from './forgot.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ForgotPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotRouting {}