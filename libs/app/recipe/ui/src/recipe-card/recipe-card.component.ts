import { Component, Input } from '@angular/core';
import { RemoveRecipe, SaveRecipe } from '@fridge-to-plate/app/profile/utils';
import { IRecipeDesc } from '@fridge-to-plate/app/recipe/utils';
import { Store } from '@ngxs/store';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent {
  @Input() recipe !: any;
  @Input() bookmarked = false;

  constructor(private store: Store) {}

  changeSaved() {
    this.bookmarked = !this.bookmarked;

    if (this.bookmarked) {
      this.store.dispatch(new SaveRecipe(this.recipe as IRecipeDesc));
    } else {
      this.store.dispatch(new RemoveRecipe(this.recipe as IRecipeDesc));
    }
  }


}
