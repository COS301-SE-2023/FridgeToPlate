import { Component, Input } from '@angular/core';
import { ProfileAPI } from '@fridge-to-plate/app/profile/data-access';

@Component({
  selector: 'recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent {
  @Input() recipe : any;
  @Input() bookmarked : boolean = false;
  @Input() profile : any;

  constructor(private profileAPI: ProfileAPI) {}

  changeSaved() {
    this.bookmarked = !this.bookmarked;

    if (!this.bookmarked) {
      this.profile.saved_recipes = this.profile.saved_recipes.filter((item: any) => item !== this.recipe );
      this.profileAPI.editProfile(this.profile);
    }
  }


}
