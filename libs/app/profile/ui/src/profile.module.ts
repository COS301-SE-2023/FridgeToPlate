import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditModalComponent } from './edit-modal/edit-modal.component';

@NgModule({
  imports: [CommonModule],
  declarations: [EditModalComponent],
  exports: [EditModalComponent]
})
export class ProfileUiModule {}
