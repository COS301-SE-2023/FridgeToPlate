import { NgModule, isDevMode } from '@angular/core';
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
import { InfoState } from '@fridge-to-plate/app/info/data-access';
import { environment } from '@fridge-to-plate/app/environments/utils';
import { NavigationBarModule } from '@fridge-to-plate/app/navigation/feature';
import {
  LOCAL_STORAGE_ENGINE,
  NgxsStoragePluginModule,
} from '@ngxs/storage-plugin';
import { ProfileState } from '@fridge-to-plate/app/profile/data-access';
import { PreferencesState } from '@fridge-to-plate/app/preferences/data-access';
import { RecommendState } from '@fridge-to-plate/app/recommend/data-access';
import { NgxsActionsExecutingModule } from '@ngxs-labs/actions-executing';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SplashUIModule } from '@fridge-to-plate/app/splash/ui';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [CoreShell, TabbedComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreRouting,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    NzStepsModule,
    NzFormModule,
    NzIconModule,
    NzSelectModule,
    HttpClientModule,
    FormsModule,
    NgxSkeletonLoaderModule,
    NavigationBarModule,
    SplashUIModule,
    NgxsLoggerPluginModule.forRoot({
      collapsed: false,
      disabled: environment.TYPE == 'production',
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.TYPE == 'production',
    }),
    NgxsModule.forRoot([AuthState, ErrorState, UndoState, InfoState, ProfileState, PreferencesState, RecommendState]),
    NgxsStoragePluginModule.forRoot({
      key: [
        {
          key: ProfileState,
          engine: LOCAL_STORAGE_ENGINE,
        },
        {
          key: PreferencesState,
          engine: LOCAL_STORAGE_ENGINE,
        },
        {
          key: RecommendState,
          engine: LOCAL_STORAGE_ENGINE,
        },
      ],
    }),
    NgxsRouterPluginModule.forRoot(),
    NgxsActionsExecutingModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [CoreShell],
})
export class CoreModule {}
