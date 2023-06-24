import { Component } from "@angular/core";

@Component({
  selector: "profile-page",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage {

  editProfileVisible = false;
  isSaveLoading = false;

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

  displaySubpage(subpageName : string) {
    this.subpage = subpageName;
  }

  removeIngredient(ingredientID: number) {
    this.ingredients.splice(ingredientID, 1);
  }

  openSettings() {
    let modal = document.getElementById("my-modal");
    if (modal != null) {
      modal.style.display = "block";
    }
  }

  handleOk(): void {
    this.isSaveLoading = true;
    setTimeout(() => {
      this.editProfileVisible = false;
      this.isSaveLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    let modal = document.getElementById("my-modal");
    if (modal != null) {
      modal.style.display = "none";
    }
  }
}
