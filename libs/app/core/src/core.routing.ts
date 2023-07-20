import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RouteGuardService } from './guards/route-guard.service';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
    },
    {
        path: 'recommend',
        loadChildren: () => import('@fridge-to-plate/app/recommend/feature').then((m) => m.RecommendModule),
        canActivate: [RouteGuardService]
    },
    {
        path: 'login',
        loadChildren: () => import('@fridge-to-plate/app/login/feature').then((m) => m.LoginModule),
    },
    {
        path: 'signup',
        loadChildren: () => import('@fridge-to-plate/app/signup/feature').then((m) => m.SignupModule),
    },
    {
        path: 'profile',
        loadChildren: () => import('@fridge-to-plate/app/profile/feature').then((m) => m.ProfileModule),
        canActivate: [RouteGuardService]
    },
    {
        path: 'create',
        loadChildren: () => import('@fridge-to-plate/app/create/feature').then((m) => m.CreateModule),
        canActivate: [RouteGuardService]
    },
    {
        path: 'recipe',
        loadChildren: () => import('@fridge-to-plate/app/recipe/feature').then((m) => m.RecipeModule),
        canActivate: [RouteGuardService]
    },
    {
        path: 'edit-recipe',
        loadChildren : () => import('@fridge-to-plate/app/edit-recipe/feature').then((m) => m.EditRecipeModule),
        canActivate: [RouteGuardService]
    }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class CoreRouting {}
