import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "profile-page",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage {

  subpage : string = "saved";
 
  name : string = "John Doe";
  email : string = "jdoe@gmail.com";

  recipes = [
    {
      name: "Shrimp Pasta",
      difficulty: "Medium",
      tags: ["Seafood", "Pasta"]
    },
    {
      name: "Pizza",
      difficulty: "Easy",
      tags: ["Italian", "Pizza"]
    },
    {
      name: "Mushroom Pie",
      difficulty: "Medium",
      tags: ["Quick"]
    },
    {
      name: "Beef Stew",
      difficulty: "Easy",
      tags: ["Winter", "Hearty"]
    },
    {
      name: "Beef Stew",
      difficulty: "Easy",
      tags: ["Winter", "Hearty"]
    },
    {
      name: "Beef Stew",
      difficulty: "Easy",
      tags: ["Winter", "Hearty"]
    },
  ]

  ingredients = [
    {
      name: "Tomato",
      amount: "3"
    },
    {
      name: "Cucumber",
      amount: "1"
    },
    {
      name: "Beef",
      amount: "200g"
    },
    {
      name: "Chicken Stock",
      amount: "500ml"
    },
  ]

  constructor(private router: Router) {}

  displaySubpage(subpageName : string) {
    this.subpage = subpageName;
  }

  removeIngredient(ingredientID: number) {
    this.ingredients.splice(ingredientID, 1);
  }

  openSettings() {
    this.router.navigate(['profile/edit']);
  }
}
