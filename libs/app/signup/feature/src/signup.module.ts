import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SignupPage } from './signup.page';
import { SignupRouting } from './signup.routing';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SignupRouting,
    IonicModule,
    FormsModule,
  ],
  declarations: [SignupPage],
})
export class SignupModule {}
