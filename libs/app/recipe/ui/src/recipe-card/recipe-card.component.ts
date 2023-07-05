import { Component, Input } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent {
  @Input() recipe : any;
  @Input() bookmarked = false;
  @Input() profile : any;

  changeSaved() {
    this.bookmarked = !this.bookmarked;

    if (!this.bookmarked) {
      this.profile.saved_recipes = this.profile.saved_recipes.filter((item: any) => item !== this.recipe );
      //TO BE COMPLETED
    }
  }


}
