import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { VerificationModalComponent } from './verification-modal/verification-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [VerificationModalComponent, ConfirmModalComponent],
  exports: [VerificationModalComponent, ConfirmModalComponent]
})
export class ForgotUIModule {}
