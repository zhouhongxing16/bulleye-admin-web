import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'staff', loadChildren: './modules/system/staff/staff.module#StaffModule'},
  {path: 'menu', loadChildren: './modules/system/menu/menu.module#MenuModule'},
  {path: 'role', loadChildren: './modules/system/role/role.module#RoleModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
