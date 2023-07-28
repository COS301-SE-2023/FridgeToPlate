import { Component, Input } from '@angular/core';
import { ProfileState } from '@fridge-to-plate/app/profile/data-access';
import { IProfile, RemoveSavedRecipe, SaveRecipe } from '@fridge-to-plate/app/profile/utils';
import { IRecipeDesc } from '@fridge-to-plate/app/recipe/utils';
import { IExplore } from '@fridge-to-plate/app/explore/utils';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IonicModule } from '@ionic/angular';


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'explore-card',
  templateUrl: './explore-card.component.html',
  styleUrls: ['./explore-card.component.scss'],
})
export class ExploreCardComponent {

  @Select(ProfileState.getProfile) profile$ !: Observable<IProfile | null>;

  //explore : IExplore;
  bookmarked = false;
  editable = false;
  image = "https://spoonacular.com/recipeImages/648279-312x231.jpg";
  @Input() explore !: any;


  constructor(private store: Store) {}

  ngOnInit(): void {
    return;
  }

  changeSaved() {
    return;
  }

  edit(){
    return;
  }

}
