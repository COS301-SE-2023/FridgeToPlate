import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { PreferencesState } from './preferences.state';
import { PreferencesAPI } from './preferences.api';

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forFeature([PreferencesState])
  ],
  providers: [PreferencesAPI]
})
export class PreferencesDataAccessModule {}
