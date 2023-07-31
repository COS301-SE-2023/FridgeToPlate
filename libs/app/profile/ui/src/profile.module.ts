import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { FormsModule } from '@angular/forms';
import { SettingsModalComponent } from './settings-modal/settings-modal.component';
import { NgxsModule } from '@ngxs/store';
import { PreferencesState } from '@fridge-to-plate/app/preferences/data-access';
import { PasswordModalComponent } from './password-modal/password-modal.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxsModule.forRoot([PreferencesState]),
  ],
  declarations: [EditModalComponent, SettingsModalComponent, PasswordModalComponent],
  exports: [EditModalComponent, SettingsModalComponent, PasswordModalComponent]
})
export class ProfileUiModule {}
