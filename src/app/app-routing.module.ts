import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: 'staff', loadChildren: './modules/system/staff/staff.module#StaffModule'},
  {path: 'menu', loadChildren: './modules/system/menu/menu.module#MenuModule'},
  {path: 'role', loadChildren: './modules/system/role/role.module#RoleModule'},
  {path: 'account', loadChildren: './modules/system/account/account.module#AccountModule'},
  {path: 'department', loadChildren: './modules/system/department/department.module#DepartmentModule'},
  {path: 'organization', loadChildren: './modules/system/organization/organization.module#OrganizationModule'},
  {path: 'menuauth', loadChildren: './modules/system/menu-auth/menu-auth.module#MenuAuthModule'},
  {path: 'wxaccount', loadChildren: './modules/wechat/wx-account/wx-account.module#WxAccountModule'},
  {path: 'wxmember', loadChildren: './modules/wechat/wx-member/wx-member.module#WxMemberModule'},
  {path: 'wxmenu', loadChildren: './modules/wechat/wx-menu/wx-menu.module#WxMenuModule'},
  {path: 'wxreply', loadChildren: './modules/wechat/wx-reply/wx-reply.module#WxReplyModule'},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
