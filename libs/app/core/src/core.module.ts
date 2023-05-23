import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CoreShell } from "./core.shell";
import { NxWelcomeComponent } from "./nx-welcome.component";
import { CoreRouting } from "./core.routing";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { RouteReuseStrategy } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [CoreShell, NxWelcomeComponent],
  imports: [
    BrowserModule,
    CoreRouting,
    ReactiveFormsModule,
    IonicModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [CoreShell],
})
export class CoreModule { }
