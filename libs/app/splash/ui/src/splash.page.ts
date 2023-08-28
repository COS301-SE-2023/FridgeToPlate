import { Component } from "@angular/core";
import { Login } from "@fridge-to-plate/app/auth/utils";
import { ActionsExecuting, actionsExecuting } from "@ngxs-labs/actions-executing";
import { Navigate } from "@ngxs/router-plugin";
import {  Store } from "@ngxs/store";


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "splash-page",
  templateUrl: "./splash.page.html",
  styleUrls: ["./splash.page.scss"],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class SplashPage {


  constructor(private store: Store) { }

}

