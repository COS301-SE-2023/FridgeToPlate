import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CoreShell } from "./core.shell";
import { NxWelcomeComponent } from "./nx-welcome.component";
import { CoreRouting } from "./core.routing";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { RouteReuseStrategy } from "@angular/router";
import {TabbedComponent} from "./tabbed-component/tabbed-component";
import {NzStepsModule} from "ng-zorro-antd/steps";
import {NzFormModule} from "ng-zorro-antd/form";

@NgModule({
  declarations: [CoreShell, NxWelcomeComponent, TabbedComponent],
  imports: [
    BrowserModule,
     CoreRouting,
    IonicModule.forRoot(), NzStepsModule, NzFormModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [CoreShell],
})
export class CoreModule { }
