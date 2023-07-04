import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreShell } from './core.shell';
import { CoreRouting } from './core.routing';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';
import { LoginModule } from '@fridge-to-plate/app/login/feature';
import { TabbedComponent } from './tabbed-component/tabbed-component';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

@NgModule({
  declarations: [CoreShell, TabbedComponent],
  imports: [
    BrowserModule,
    LoginModule,
    CoreRouting,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    NzStepsModule,
    NzFormModule,
    NzIconModule,
    HttpClientModule,
    FormsModule,
    NgxsLoggerPluginModule.forRoot({
      collapsed: false,
      // disabled: ENVIRONMENT == 'production',
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      // disabled: ENVIRONMENT == 'production',
    }),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [CoreShell],
})
export class CoreModule {}
