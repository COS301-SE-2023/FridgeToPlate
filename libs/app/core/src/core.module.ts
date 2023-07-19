import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreShell } from './core.shell';
import { CoreRouting } from './core.routing';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';
import { TabbedComponent } from './tabbed-component/tabbed-component';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import { ErrorState } from '@fridge-to-plate/app/error/data-access';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { AuthState } from '@fridge-to-plate/app/auth/data-access';
import { UndoState } from '@fridge-to-plate/app/undo/data-access';
import { RecipeState } from '@fridge-to-plate/app/recipe/data-access';
import { UndoState } from '@fridge-to-plate/app/undo/data-access';

@NgModule({
  declarations: [
    CoreShell, 
    TabbedComponent, 
  ],
  imports: [
    BrowserModule,
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
    NgxsModule.forRoot([AuthState, ErrorState, RecipeState, UndoState]),
    NgxsRouterPluginModule.forRoot(),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [CoreShell],
})
export class CoreModule {}
