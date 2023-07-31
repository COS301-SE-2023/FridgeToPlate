import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { LoginPage } from './login.page';
import { LoginRouting } from './login.routing';
import { FormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { ProfileState } from '@fridge-to-plate/app/profile/data-access';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoginRouting,
    IonicModule,
    FormsModule,
    NgxsModule.forFeature([ProfileState])
  ],
  declarations: [LoginPage],
})
export class LoginModule {}
