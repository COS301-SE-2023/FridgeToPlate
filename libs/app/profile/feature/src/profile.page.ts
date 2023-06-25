import { Component } from "@angular/core";
import { ProfileAPI } from "@fridge-to-plate/app/profile/data-access";

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
    saved_recipes: [
      {
        id: "1",
        name: "Shrimp Pasta",
        difficulty: "Medium",
        tags: ["Seafood", "Pasta"]
      },
      {
        id: "2",
        name: "Pizza",
        difficulty: "Easy",
        tags: ["Italian", "Pizza"]
      },
      {
        id: "3",
        name: "Mushroom Pie",
        difficulty: "Medium",
        tags: ["Quick"]
      },
      {
        id: "4",
        name: "Beef Stew",
        difficulty: "Easy",
        tags: ["Winter", "Hearty"]
      },
      {
        id: "5",
        name: "Beef Stew",
        difficulty: "Easy",
        tags: ["Winter", "Hearty"]
      },
      {
        id: "6",
        name: "Beef Stew",
        difficulty: "Easy",
        tags: ["Winter", "Hearty"]
      },
    ],
    ingredients: [
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
    ],
  }

  editableProfile = Object.create(this.profile);

  constructor(private api: ProfileAPI) {}

  displaySubpage(subpageName : string) {
    this.subpage = subpageName;
  }

  removeIngredient(ingredient: any) {
    this.profile.ingredients = this.profile.ingredients.filter((item: any) => item !== ingredient );
  }

  openEditProfile() {
    this.editableProfile = Object.create(this.profile);
    this.displayEditProfile = "block";
  }

  closeEditProfile() {
    this.displayEditProfile = "none";
  }

  saveProfile() {
    this.api.editProfile(this.editableProfile);
    this.profile = this.editableProfile;
  }
}
