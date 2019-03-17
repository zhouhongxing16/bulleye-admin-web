import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MenuAuthRoutingModule} from './menu-auth-routing.module';
import {MenuAuthListComponent} from './menu-auth-list/menu-auth-list.component';
import {MenuAuthEditComponent} from './menu-auth-edit/menu-auth-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';

@NgModule({
  declarations: [MenuAuthListComponent, MenuAuthEditComponent],
  imports: [
    CommonModule,
    MenuAuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroAntdModule
  ]
})
export class MenuAuthModule {

}
