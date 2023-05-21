import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import {
  RecipeRecommendationPage
} from "../../recipe-recommendation/src/components/RecipeRecommendationPage/recipe-recommendation-page";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: NxWelcomeComponent,
    }, { path: 'recommendations', component: RecipeRecommendationPage}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    ],
    exports: [RouterModule],
})
export class CoreRouting {}
