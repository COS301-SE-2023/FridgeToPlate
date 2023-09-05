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

  hidden = false;
  hide = false;

  constructor(private store: Store) { }

  ngOnInit() {
    this.hidden = false;
    this.hide = false;

    setTimeout(() => {
      this.hidden = true;
      
      setTimeout(() => {
        this.hide = true;
      }, 250);
    }, 2500); 
    return;
  }

}

