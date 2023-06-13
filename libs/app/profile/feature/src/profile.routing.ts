import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePage } from './profile.page';
import { EditProfilePage } from 'libs/app/edit-profile/feature/src/edit-profile.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ProfilePage,
  },
  {
    path: 'edit',
    loadChildren: () => import('@fridge-to-plate/app/edit-profile/feature').then((m) => m.EditProfileModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRouting {}