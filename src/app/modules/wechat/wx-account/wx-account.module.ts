import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WxAccountRoutingModule } from './wx-account-routing.module';
import { WxAccountListComponent } from './wx-account-list/wx-account-list.component';
import { WxAccountEditComponent } from './wx-account-edit/wx-account-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';

@NgModule({
  declarations: [WxAccountListComponent, WxAccountEditComponent],
  imports: [
    CommonModule,
    WxAccountRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroAntdModule
  ]
})
export class WxAccountModule { }
