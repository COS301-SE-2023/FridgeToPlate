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

  splashLogoImage = "/assets/Final Logo.png";
  splashFooterImage = "/assets/Splash Footer.png";
  constructor(private store: Store) { }

  ngOnInit() {

    // setTimeout(() => {
    //   this.store.dispatch(new Navigate(['/login']));
    // }, 1500); 
    return;
  }

}

