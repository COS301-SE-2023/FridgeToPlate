import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPage } from './forgot.page';
import { ConfirmModalComponent } from '@fridge-to-plate/app/forgot/ui';
import { VerificationModalComponent } from '@fridge-to-plate/app/forgot/ui';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ForgotPage,
  },
  {
    path: 'confirm',
    pathMatch: 'full',
    component: ConfirmModalComponent,
  },
  {
    path: 'verification',
    pathMatch: 'full',
    component: VerificationModalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotRouting {}