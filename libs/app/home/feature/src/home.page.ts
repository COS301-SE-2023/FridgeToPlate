import { Component, NgZone } from '@angular/core';
import { ProfileState } from '@fridge-to-plate/app/profile/data-access';
import { IProfile } from '@fridge-to-plate/app/profile/utils';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RecommendState } from '@fridge-to-plate/app/recommend/data-access';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { RecipeState } from '@fridge-to-plate/app/recipe/data-access';
import { Router } from '@angular/router';

@Component({
  selector: 'fridge-to-plate-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class HomePage {
  mealType :'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' = 'Breakfast'
  messageHeader = '';
  @Select(ProfileState.getProfile) profile$ !: Observable<IProfile>;
  // @Select(RecommendState.getRecipes) recipes$ !: Observable<IRecipe[]>;
  @Select(RecipeState.getFeaturedRecipes) featuredRecipes$ !: Observable<IRecipe[]>;
  
  constructor(private readonly router: Router, private readonly ngZone: NgZone){
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    if (currentHour >= 5 && currentHour < 12) {
      this.mealType = 'Breakfast';
      this.messageHeader = `Good morning! What's on the menu for breakfast?`;
    }
    else if (currentHour >= 12 && currentHour < 17) {
      this.mealType = 'Lunch';
      this.messageHeader = `Hungry for a delicious lunch? Let's get cooking!`;
    }
    else if (currentHour >= 17 && currentHour < 21) {
      this.mealType = 'Dinner';
      this.messageHeader = `It's dinner time! Enjoy a tasty meal tonight.`;
    }
    else {
      this.mealType = 'Snack';
      this.messageHeader = `Time for a snack! What do you feel like making?`;
    }
  }

  goToRecommend(): void {
    this.ngZone.run(() => {
      this.router.navigate(['/recommend']);
    });
  }
}
