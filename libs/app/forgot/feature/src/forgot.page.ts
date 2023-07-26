import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Forgot } from "@fridge-to-plate/app/auth/utils";
import { Navigate } from "@ngxs/router-plugin";
import { Store } from "@ngxs/store";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "forgot-page",
  templateUrl: "./forgot.page.html",
  styleUrls: ["./forgot.page.scss"],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class ForgotPage {

  username = "";
  password = "";

  displayConfirm = "none";
  displayVerification = "none";

  constructor(private store: Store) { }

  onForgot(form: NgForm){
    if (form.valid) {
      this.store.dispatch(new Forgot(this.username));
    }
  }
}

