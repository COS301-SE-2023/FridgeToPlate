import { Component, NgZone, OnInit } from '@angular/core';
import { ProfileState } from '@fridge-to-plate/app/profile/data-access';
import { IProfile } from '@fridge-to-plate/app/profile/utils';
import { Select, Store } from '@ngxs/store';
import { delay, Observable } from 'rxjs';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';
import { Router } from '@angular/router';
import { HomeState } from '../../data-access/src/home.state';
import {
  ClearFeaturedRecipes,
  RetrieveFeaturedRecipes,
} from '../../utils/src/home.actions';

@Component({
  selector: 'fridge-to-plate-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class HomePage implements OnInit {
  mealType = 'breakfast';
  messageHeader = '';
  @Select(ProfileState.getProfile) profile$!: Observable<IProfile>;
  @Select(HomeState.getFeaturedRecipes) featuredRecipes$!: Observable<
    IRecipe[]
  >;

  featuredRecipesDelayed$: Observable<IRecipe[]> = this.featuredRecipes$.pipe(
    delay(2000)
  );

  constructor(
    private readonly router: Router,
    private readonly ngZone: NgZone,
    private store: Store
  ) {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();;
    if (currentHour >= 5 && currentHour < 12) {
      this.mealType = 'breakfast';
      this.messageHeader = `Good morning!\nWhat's on the menu for breakfast?`;
    } else if (currentHour >= 12 && currentHour < 17) {
      this.mealType = 'lunch';
      this.messageHeader = `Hungry for a delicious lunch?\nLet's get cooking!`;
    } else if (currentHour >= 17 && currentHour < 21) {
      this.mealType = 'dinner';
      this.messageHeader = `It's dinner time!\nEnjoy a tasty meal tonight.`;
    } else {
      this.mealType = 'snack';
      this.messageHeader = `Time for a snack!\nWhat do you feel like making?`;
    }
  }

  goToRecommend(): void {
    this.ngZone.run(() => {
      this.router.navigate(['/recommend']);
    });
  }

  ngOnInit() {
    this.store.dispatch(new ClearFeaturedRecipes());
    this.store.dispatch(new RetrieveFeaturedRecipes(this.mealType));
  }
}
