import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { PreferenceState } from './preference.state';
import { PreferenceAPI } from './preference.api';

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forFeature([PreferenceState])
  ],
  providers: [PreferenceAPI]
})
export class PreferenceDataAccessModule {}
