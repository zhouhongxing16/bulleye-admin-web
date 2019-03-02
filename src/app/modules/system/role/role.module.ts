import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleEditComponent } from './role-edit/role-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';

@NgModule({
  declarations: [RoleListComponent, RoleEditComponent],
  imports: [
    CommonModule,
    RoleRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroAntdModule
  ]
})
export class RoleModule { }