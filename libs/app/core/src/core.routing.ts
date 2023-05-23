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
        path: 'profile',
        loadChildren: () => import('@fridge-to-plate/app/profile/feature').then((m) => m.ProfileModule),
    },
    {
        path: 'create',
        loadChildren: () =>
          import('@fridge-to-plate/app/create/feature').then((m) => m.CreateModule),
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    ],
    exports: [RouterModule],
})
export class CoreRouting {}
