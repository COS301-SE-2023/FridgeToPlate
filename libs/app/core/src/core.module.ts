import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CoreShell } from "./core.shell";
import { NxWelcomeComponent } from "./nx-welcome.component";

@NgModule({
  declarations: [CoreShell, NxWelcomeComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [CoreShell],
})
export class CoreModule {}
