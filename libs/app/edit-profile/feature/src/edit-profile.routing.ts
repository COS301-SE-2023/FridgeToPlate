import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfilePage } from './edit-profile.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: EditProfilePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditProfileRouting {}