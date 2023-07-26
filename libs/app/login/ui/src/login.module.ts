import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ForgotModalComponent } from './forgot-modal/forgot-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [ForgotModalComponent],
  exports: [ForgotModalComponent]
})
export class LoginUIModule {}
