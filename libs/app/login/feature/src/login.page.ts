import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Login } from "@fridge-to-plate/app/auth/utils";
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
  @Select(actionsExecuting([Login])) busy$ !: Observable<ActionsExecuting>;

  constructor(private store: Store) { }

  onSignIn(form: NgForm){
 
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
    this.store.dispatch(new Navigate(['/recommend']));
  }
}

