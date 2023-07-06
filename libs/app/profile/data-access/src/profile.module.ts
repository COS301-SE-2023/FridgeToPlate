import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileAPI } from './profile.api';
import { NgxsModule } from '@ngxs/store';
import { ProfileState } from './profile.state';

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forFeature([ProfileState])
  ],
  providers: [ProfileAPI]
})
export class ProfileDataAccessModule {}
