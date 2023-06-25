import { Component } from "@angular/core";

@Component({
  selector: "profile-page",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage {

  displayEditProfile = "none";

  subpage: string = "saved";

  profile = {
    name: "John Doe",
    username: "jdoe",
    email: "jdoe@gmail.com",
  }

  editableProfile = Object.create(this.profile);

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

  displaySubpage(subpageName : string) {
    this.subpage = subpageName;
  }

  removeIngredient(ingredientID: number) {
    this.ingredients.splice(ingredientID, 1);
  }

  openEditProfile() {
    this.editableProfile = Object.create(this.profile);
    this.displayEditProfile = "block";
  }

  closeEditProfile() {
    this.displayEditProfile = "none";
  }

  saveProfile() {
    this.profile = this.editableProfile;
  }
}
