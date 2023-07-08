import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.api';

@NgModule({
  imports: [CommonModule],
  providers: [AuthService]
})
export class AuthDataAccessModule {}
