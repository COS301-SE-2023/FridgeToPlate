import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IRecipe } from '@fridge-to-plate/app/recipe/utils';

@Injectable({
  providedIn: 'root',
})
export class RecipeAPI {
  private baseUrl = 'http://localhost:5000/recipes';

  constructor(private http: HttpClient) {}

  UpdateRecipe(recipe: IRecipe): Observable<IRecipe> {
    const url = this.baseUrl + '/' + recipe.recipeId;
    return this.http.put<IRecipe>(url, recipe);
  }

  deleteRecipe(id: string): Observable<string> {
    const url = this.baseUrl + '/' + id;
    return this.http.delete<string>(url);
  }

  getRecipeById(id: string): Observable<IRecipe> {
    const dummyRecipe: IRecipe = {
      creator: 'SimphiweNonabe',
      description: 'Nice Nice Delicious Food, Good for the stomach and stuff.',
      difficulty: 'Hard',
      ingredients: [
        {
          name: 'Bacon',
          amount: 200,
          unit: 'grams',
        },
        {
          name: 'Bread',
          amount: 2,
          unit: 'slices',
        },
        {
          name: 'Lettuce',
          amount: 6,
          unit: 'grams',
        },
        {
          name: 'Tomato',
          amount: 2,
          unit: 'slices',
        },
      ],
      meal: 'Lunch',
      name: 'BLT Sandwich',
      prepTime: 10,
      recipeId: '65vgbfg-6gdfbg-75789yh-t754vu',
      recipeImage: 'https://source.unsplash.com/500x500/?food',
      reviews: [
        {
          reviewId: '3',
          recipeId: '65vgbfg-6gdfbg-75789yh-t754vu',
          description: 'Needs salt',
          rating: 2,
          username: 'Friendin',
        },
        {
          reviewId: '2',
          recipeId: '65vgbfg-6gdfbg-75789yh-t754vu',
          description: 'Amazing if you crispify the bacon',
          rating: 5,
          username: 'jdoe',
        },
        {
          reviewId: '6',
          recipeId: '65vgbfg-6gdfbg-75789yh-t754vu',
          description: 'Needs less salt',
          rating: 3,
          username: 'SaltBae',
        },
      ],
      servings: 1,
      steps: [
        'Take two bread slices',
        'Slice two slices of tomato',
        'Put slices of tomato one of each on bread',
        'Fry 200 grams of bacon in thin film of oil',
        'Put bacon on slices of bread',
        'Take lettuce leaf and put on bread',
      ],
      tags: ['Bacon', 'Protein', 'Bread', 'Simple'],
    };

    const url = `${this.baseUrl}/${id}`;
    //TODO: Uncomment on backend fix
    //return this.http.get<IRecipe>(url);
    return new BehaviorSubject<IRecipe>(dummyRecipe);
  }

  updateRecipe(recipe: IRecipe): void {
    const url = `${this.baseUrl}/${recipe.recipeId}`;
    this.http.put<IRecipe>(url, recipe);
  }
}
