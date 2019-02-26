import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RoleEditComponent} from './role-edit/role-edit.component';
import {RoleListComponent} from './role-list/role-list.component';

const routes: Routes = [
  {path: '', component: RoleListComponent},
  {path: 'edit', component: RoleEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
