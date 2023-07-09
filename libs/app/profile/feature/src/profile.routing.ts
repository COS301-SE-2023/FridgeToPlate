import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePage } from './profile.page';
import { NotificationsPageComponent } from 'libs/app/notifications/feature/src/lib/notifications-page/notifications-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ProfilePage },
      { path: 'notifications', component: NotificationsPageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRouting {}
