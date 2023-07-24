import { Component } from "@angular/core";
import { Navigate } from "@ngxs/router-plugin";
import { Store } from "@ngxs/store";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "unauthorised-page",
  templateUrl: "./unauthorised.page.html",
  styleUrls: ["./unauthorised.page.scss"],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class UnauthorisedPage {
  
  constructor(private store: Store) {}
  
  login() {
    this.store.dispatch(new Navigate(['/login']));
  }

  signUp() {
    this.store.dispatch(new Navigate(['/signup']));
  }
}
