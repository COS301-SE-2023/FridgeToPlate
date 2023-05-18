import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ProfilePage } from './profile.page';
import { ProfileRouting } from './profile.routing';

@NgModule({
  imports: [
    CommonModule,
    ProfileRouting,
    IonicModule,
  ],
  declarations: [ProfilePage],
})
export class ProfileModule {}
