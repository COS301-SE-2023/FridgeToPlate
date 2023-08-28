import { Component, OnInit } from "@angular/core";
import { Navigate } from "@ngxs/router-plugin";
import {  Store } from "@ngxs/store";


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "splash-page",
  templateUrl: "./splash.page.html",
  styleUrls: ["./splash.page.scss"],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class SplashPage implements OnInit {


  constructor(private store: Store) { }

  ngOnInit() {
    // Simulate an asynchronous initialization process
    setTimeout(() => {
      this.store.dispatch(new Navigate(['/login']));
    }, 1500); // Replace with the actual initialization time
  }

}

