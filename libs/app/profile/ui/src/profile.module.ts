import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { FormsModule } from '@angular/forms';
import { SettingsModalComponent } from './settings-modal/settings-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [EditModalComponent, SettingsModalComponent],
  exports: [EditModalComponent, SettingsModalComponent]
})
export class ProfileUiModule {}
