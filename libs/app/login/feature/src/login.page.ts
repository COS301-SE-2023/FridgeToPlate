import { Component, OnInit } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: "login-page",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {

  isLoading: boolean = false;
  username: string = "";
  password: string = "";

  constructor(private router: Router) { }

  onSignIn(form: NgForm){

  }


  ngOnInit(): void {}

  login() {
    return;
  }

  reset() {
    return;
  }

  create() {
    this.router.navigate(["/signup"])
  }

  guest() {
    return;
  }
}

