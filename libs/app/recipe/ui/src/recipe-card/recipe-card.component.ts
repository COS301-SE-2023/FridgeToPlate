import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent {
  @Input() recipe : any;
  @Input() bookmarked : boolean = false;
  @Input() profile : any;

  changeSaved() {
    this.bookmarked = !this.bookmarked;

    if (!this.bookmarked) {
      this.profile.saved_recipes = this.profile.saved_recipes.filter((item: any) => item !== this.recipe );
    }
  }


}
