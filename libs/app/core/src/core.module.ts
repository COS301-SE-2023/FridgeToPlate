import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CoreShell } from "./core.shell";
import { NxWelcomeComponent } from "./nx-welcome.component";
import { CoreRouting } from "./core.routing";
import { IonicModule } from "@ionic/angular";
import { RouteReuseStrategy } from "@angular/router";
import { IonicRouteStrategy } from '@ionic/angular';

@NgModule({
  declarations: [CoreShell, NxWelcomeComponent],
  imports: [
    BrowserModule, 
    // CoreRouting, 
    IonicModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [CoreShell],
})
export class CoreModule { }
