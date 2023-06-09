import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "signup-page",
  templateUrl: "./signup.page.html",
  styleUrls: ["./signup.page.scss"],
})

export class SignupPage {

  constructor(private router: Router) {}

  login() {
    this.router.navigate(['/login']);
  }

  createAccount() {
    alert("create account");
  }

  guest() {
    alert("Entering Guest...");
  }

  // passwordMatchValidator(form: FormGroup) {
  //   const password = form.get('password');
  //   const confirmPassword = form.get('confirmPassword');
  //   if (password.value !== confirmPassword.value) {
  //     confirmPassword.setErrors({ passwordMatch: true });
  //   } else {
  //     confirmPassword.setErrors(null);
  //   }
  //   return null;
  // }

  // onNext() {
  //   if (this.registerForm.valid) {
  //     // Save the user data to the database
  //     // and navigate to the login page
  //     this.router.navigate(['/login']);
  //   }
  // }
}
