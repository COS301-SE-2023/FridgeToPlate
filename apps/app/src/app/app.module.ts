import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { ProfileModule } from "@fridge-to-plate/app/profile/feature";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ProfileModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
