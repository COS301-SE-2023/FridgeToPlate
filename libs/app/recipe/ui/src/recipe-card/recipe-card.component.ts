import { Component, Input, OnInit, NgZone  } from '@angular/core';
import { ProfileState } from '@fridge-to-plate/app/profile/data-access';
import { IProfile, RemoveRecipe, SaveRecipe } from '@fridge-to-plate/app/profile/utils';
import { IRecipeDesc } from '@fridge-to-plate/app/recipe/utils';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router'; 
import { ShowError } from '@fridge-to-plate/app/error/utils';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent implements OnInit {
  
  @Select(ProfileState.getProfile) profile$ !: Observable<IProfile | null>;

  @Input() recipe !: any;
  bookmarked = false;
  editable = true;

  constructor(private store: Store, private router: Router, private ngZone: NgZone ) {}

  ngOnInit(): void {
    this.profile$.subscribe(profile => {
      if (profile !== null && this.recipe !== undefined) {
        this.bookmarked = profile.savedRecipes.includes(this.recipe as IRecipeDesc);
        this.editable = profile.createdRecipes.includes(this.recipe as IRecipeDesc);
      } else {
        this.bookmarked = false;
        this.editable = false;
      }
    });
  }

  changeSaved() {
    if (this.bookmarked) {
      this.store.dispatch(new RemoveRecipe(this.recipe as IRecipeDesc));
    } else {
      this.store.dispatch(new SaveRecipe(this.recipe as IRecipeDesc));
    }
  }

  edit() {

      if(!this.recipe){
        this.store.dispatch( new ShowError('ERROR: No recipe available to edit.'))
        return;
      }
      
      this.ngZone.run( ()=> {
        this.router.navigate( [
          'edit-recipe'
        ],
        { queryParams: { 
          recipeId: JSON.stringify(this.recipe.recipeId) 
        }})
      })
  }

}
