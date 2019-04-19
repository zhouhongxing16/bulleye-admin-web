import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRecordRoutingModule } from './login-record-routing.module';
import { LoginRecordListComponent } from './login-record-list/login-record-list.component';
import { LoginRecordEditComponent } from './login-record-edit/login-record-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';

@NgModule({
  declarations: [LoginRecordListComponent, LoginRecordEditComponent],
  imports: [
    CommonModule,
    LoginRecordRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroAntdModule
  ]
})
export class LoginRecordModule { }
