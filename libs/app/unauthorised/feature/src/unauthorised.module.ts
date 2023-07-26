import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnauthorisedRouting } from './unauthorised.routing';
import { UnauthorisedPage } from './unauthorised.page';

@NgModule({
  imports: [CommonModule, UnauthorisedRouting],
  declarations: [UnauthorisedPage],
  exports: [UnauthorisedPage]
})
export class UnauthorisedModule {}
