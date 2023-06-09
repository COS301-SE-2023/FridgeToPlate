import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "login-page",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage {

  constructor( private router: Router) {}

  login() {
    alert("Logging In...");
  }

  reset() {
    alert("Resetting...");
  }

  create() {
    this.router.navigate(['/signup'])
  }

  guest() {
    alert("Entering Guest...");
  }
}

