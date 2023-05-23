import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CoreShell } from "./core.shell";
import { NxWelcomeComponent } from "./nx-welcome.component";
import { CoreRouting } from "./core.routing";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { RouteReuseStrategy } from "@angular/router";
import { LoginModule } from '@fridge-to-plate/app/login/feature';

@NgModule({
  declarations: [CoreShell, NxWelcomeComponent],
  imports: [
    BrowserModule,
    LoginModule,
    CoreRouting,
    IonicModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [CoreShell],
})
export class CoreModule { }
