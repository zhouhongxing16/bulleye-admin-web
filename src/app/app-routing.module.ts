import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'staff/list', loadChildren: './modules/staff/staff.module#StaffModule'},
  {path: 'menu/list', loadChildren: './modules/menu/menu.module#MenuModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
