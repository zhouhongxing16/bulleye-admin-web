import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'staff', loadChildren: './modules/system/staff/staff.module#StaffModule'},
  {path: 'menu', loadChildren: './modules/system/menu/menu.module#MenuModule'},
  {path: 'role', loadChildren: './modules/system/role/role.module#RoleModule'},
  {path: 'account', loadChildren: './modules/system/account/account.module#AccountModule'},
  {path: 'wxaccount', loadChildren: './modules/wechat/wx-account/wx-account.module#WxAccountModule'},
  {path: 'wxmember', loadChildren: './modules/wechat/wx-member/wx-member.module#WxMemberModule'},
  {path: 'wxmenu', loadChildren: './modules/wechat/wx-menu/wx-menu.module#WxMenuModule'},
  {path: 'wxreply', loadChildren: './modules/wechat/wx-reply/wx-reply.module#WxReplyModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
