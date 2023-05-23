import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { LoginPage } from './login.page';
import { LoginRouting } from './login.routing';

@NgModule({
  imports: [
    CommonModule,
    LoginRouting,
    IonicModule,
  ],
  declarations: [LoginPage],
})
export class LoginModule {}
