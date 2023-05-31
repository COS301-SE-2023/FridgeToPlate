import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: NxWelcomeComponent,
    }, 
    { 
        path: 'recommendations', 
        loadChildren: () => import('@fridge-to-plate/app/recommend/feature').then((m) => m.AppRecipeRecommendationModule),
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
    },
    {
        path: 'create',
        loadChildren: () => import('@fridge-to-plate/app/create/feature').then((m) => m.CreateModule),
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    ],
    exports: [RouterModule],
})
export class CoreRouting {}
