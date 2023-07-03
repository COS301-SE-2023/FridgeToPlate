import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePagComponent } from './create.page';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CreatePagComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateRouting {}