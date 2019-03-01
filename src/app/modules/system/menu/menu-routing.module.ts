import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MenuEditComponent} from './menu-edit/menu-edit.component';
import {MenuListComponent} from './menu-list/menu-list.component';

const routes: Routes = [
  {path: 'list', component: MenuListComponent},
  {path: 'edit:/id', component: MenuEditComponent},
  {path: 'add', component: MenuEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
