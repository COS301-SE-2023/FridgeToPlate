import { Route } from '@angular/router';
import {RecipeDetailPageComponent} from "./recipe-detail-page/recipe-detail-page.component";

export const appRecipeDetailFeatureRoutes: Route[] = [
  /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
  {path: '', component: RecipeDetailPageComponent}
];
