import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Login } from "@fridge-to-plate/app/auth/utils";
import { ShowError } from "@fridge-to-plate/app/error/utils";
import { RetrievePreferences } from "@fridge-to-plate/app/preferences/utils";
import { RetrieveProfile } from "@fridge-to-plate/app/profile/utils";
import { GetUpdatedRecommendation } from "@fridge-to-plate/app/recommend/utils";
import { ActionsExecuting, actionsExecuting } from "@ngxs-labs/actions-executing";
import { Navigate } from "@ngxs/router-plugin";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "login-page",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class LoginPage {

  username = "";
  password = "";
  logoImage = "/assets/Fridge Logo Transparent.png";
  @Select(actionsExecuting([Login, RetrievePreferences, RetrieveProfile, GetUpdatedRecommendation])) busy$ !: Observable<ActionsExecuting>;

  constructor(private store: Store) { }

  onSignIn(form: NgForm){

    if (this.username.trim() == '') {
      this.store.dispatch(new ShowError("Enter Your Username"));
      return;
    }
    if (this.password.trim() == '') {
      this.store.dispatch(new ShowError("Enter Your Password"));
      return;
    }
    if (this.password.trim().length < 8) {
      this.store.dispatch(new ShowError("Password Must Be At Least 8 Characters Long"));
      return;
    }

    if (form.valid) {
      this.store.dispatch(new Login(this.username, this.password));
    }
  }

  reset() {
    this.store.dispatch(new Navigate(['/forgot']));
  }

  create() {
    this.store.dispatch(new Navigate(['/signup']));
  }

  guest() {
    this.store.dispatch(new Navigate(['/home']));
  }
}

