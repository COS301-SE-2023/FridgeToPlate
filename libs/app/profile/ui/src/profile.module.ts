import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { FormsModule } from '@angular/forms';
import { SettingsModalComponent } from './settings-modal/settings-modal.component';
import { NgxsModule } from '@ngxs/store';
import { PreferencesState } from '@fridge-to-plate/app/preferences/data-access';
import { PasswordModalComponent } from './password-modal/password-modal.component';
import { ShoppinglistComponent } from './shopping-list-modal/shoppinglist.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, NgxsModule.forRoot([PreferencesState])],
  declarations: [
    EditModalComponent,
    SettingsModalComponent,
    PasswordModalComponent,
    ShoppinglistComponent,
  ],
  exports: [EditModalComponent, SettingsModalComponent, PasswordModalComponent, ShoppinglistComponent],
})
export class ProfileUiModule {}
