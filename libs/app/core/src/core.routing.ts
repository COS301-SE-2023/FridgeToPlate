import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: NxWelcomeComponent,
    },

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    ],
    exports: [RouterModule],
})
export class CoreRouting {}
