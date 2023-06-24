import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreShell } from './core.shell';
import { NxWelcomeComponent } from './nx-welcome.component';
import { CoreRouting } from './core.routing';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';
import { LoginModule } from '@fridge-to-plate/app/login/feature';
import { TabbedComponent } from './tabbed-component/tabbed-component';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CoreShell, NxWelcomeComponent, TabbedComponent],
  imports: [
    BrowserModule,
    LoginModule,
    CoreRouting,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    NzStepsModule,
    NzFormModule,
    NzIconModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [CoreShell],
})
export class CoreModule {}
