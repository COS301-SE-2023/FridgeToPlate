import { Component } from "@angular/core";
import { ProfileAPI } from "@fridge-to-plate/app/profile/data-access";
import { IProfile } from '@fridge-to-plate/app/profile/utils';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { IIngredient } from '@fridge-to-plate/app/ingredient/utils';
import { Router } from "@angular/router";

@Component({
  selector: "profile-page",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage {

  displayEditProfile = "none";
  displaySettings = "none";

  subpage: string = "saved";

  profile : any;

  editableProfile : any;

  ingredientArray: IIngredient = {
    ingredientId: "75e4269f-c3bd-4dbf-bd2c-e1ec60ac048c",
    name: "garlic"
  }

  ngOnInit() {
    this.profile = {
      profileId: "1",
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
    };
    this.editableProfile = Object.create(this.profile);

  }

  constructor(private router: Router, private api: ProfileAPI) {}

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

  openSettings() {
    this.editableProfile = Object.create(this.profile);
    this.displaySettings = "block";
  }

  closeSettings() {
    this.displaySettings = "none";
  }

  saveProfile() {
    this.api.editProfile(this.editableProfile);
    this.profile = this.editableProfile;
  }

  openNotifications() {
    this.router.navigate(["/notifications"]);
  }
}
