import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CoreShell } from "./core.shell";
import { NxWelcomeComponent } from "./nx-welcome.component";
import { CoreRouting } from "./core.routing";

@NgModule({
  declarations: [CoreShell, NxWelcomeComponent],
  imports: [BrowserModule, CoreRouting],
  providers: [],
  bootstrap: [CoreShell],
})
export class CoreModule {}
