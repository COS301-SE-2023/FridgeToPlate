import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupPage } from './signup.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SignupPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupRouting {}
