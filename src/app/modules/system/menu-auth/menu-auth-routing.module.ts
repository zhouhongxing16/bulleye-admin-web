import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MenuAuthListComponent} from './menu-auth-list/menu-auth-list.component';
import {MenuAuthEditComponent} from './menu-auth-edit/menu-auth-edit.component';

const routes: Routes = [
  {path: 'list', component: MenuAuthListComponent},
  {path: 'list/:id', component: MenuAuthListComponent},
  {path: 'edit/:id', component: MenuAuthEditComponent},
  {path: 'add', component: MenuAuthEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuAuthRoutingModule { }
