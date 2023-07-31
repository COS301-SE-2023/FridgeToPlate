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
import { environment } from '@fridge-to-plate/app/environments/utils';
import { NavigationBarModule } from '@fridge-to-plate/app/navigation/feature';
import { LOCAL_STORAGE_ENGINE, NgxsStoragePluginModule, SESSION_STORAGE_ENGINE } from '@ngxs/storage-plugin';
import { ProfileState } from '@fridge-to-plate/app/profile/data-access';
import { PreferencesState } from '@fridge-to-plate/app/preferences/data-access';
import { RecommendState } from '@fridge-to-plate/app/recommend/data-access';
import { NgxsActionsExecutingModule } from '@ngxs-labs/actions-executing'

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
    NavigationBarModule,
    NgxsLoggerPluginModule.forRoot({
      collapsed: false,
      disabled: environment.TYPE == 'production',
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.TYPE == 'production',
    }),
    NgxsModule.forRoot([AuthState, ErrorState, UndoState]),
    NgxsStoragePluginModule.forRoot({
      key: [
        {
          key: ProfileState,
          engine: LOCAL_STORAGE_ENGINE
        },
        {
          key: PreferencesState,
          engine: LOCAL_STORAGE_ENGINE
        },
        {
          key: RecommendState,
          engine: LOCAL_STORAGE_ENGINE
        },
      ]
    }),
    NgxsRouterPluginModule.forRoot(),
    NgxsActionsExecutingModule.forRoot()
    
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [CoreShell],
})
export class CoreModule {}
