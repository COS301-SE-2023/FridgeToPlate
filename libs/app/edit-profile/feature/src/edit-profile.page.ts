import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "edit-profile-page",
  templateUrl: "./edit-profile.page.html",
  styleUrls: ["./edit-profile.page.scss"],
})
export class EditProfilePage {
  
  constructor(private router: Router) {}

  closeSettings() {
    this.router.navigate(['/profile']);
  }
}
