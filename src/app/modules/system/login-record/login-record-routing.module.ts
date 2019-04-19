import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginRecordEditComponent} from './login-record-edit/login-record-edit.component';
import {LoginRecordListComponent} from './login-record-list/login-record-list.component';

const routes: Routes = [
  {path: 'list', component: LoginRecordListComponent},
  {path: 'edit/:id', component: LoginRecordEditComponent},
  {path: 'add', component: LoginRecordEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRecordRoutingModule { }
