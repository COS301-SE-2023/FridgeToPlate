import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplashPage } from './splash.page';
import { SplashRouting } from './splash.routing';

@NgModule({
  imports: [
    CommonModule,
    SplashRouting,
  ],
  declarations: [SplashPage],
  exports: [SplashPage]
})
export class SplashUIModule {}
