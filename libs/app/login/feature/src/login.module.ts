import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { LoginPage } from './login.page';
import { LoginRouting } from './login.routing';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoginRouting,
    IonicModule,
  ],
  declarations: [LoginPage],
})
export class LoginModule {}
