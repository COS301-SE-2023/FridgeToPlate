import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProfilePage } from './edit-profile.page';
import { EditProfileRouting } from './edit-profile.routing';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    EditProfileRouting,
    IonicModule,
  ],
  declarations: [EditProfilePage]
})
export class EditProfileModule {}
