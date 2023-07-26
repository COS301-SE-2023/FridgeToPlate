import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnauthorisedPage } from './unauthorised.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UnauthorisedPage,
  },
  {
    path: 'notifications',
    loadChildren: () =>
      import('@fridge-to-plate/app/notifications/feature').then(
        (m) => m.NotificationsFeatureModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnauthorisedRouting {}
