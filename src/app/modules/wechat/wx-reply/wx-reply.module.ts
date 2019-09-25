import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WxReplyRoutingModule } from './wx-reply-routing.module';
import { WxReplyEditComponent } from './wx-reply-edit/wx-reply-edit.component';
import { WxReplyListComponent } from './wx-reply-list/wx-reply-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";

@NgModule({
  declarations: [WxReplyEditComponent, WxReplyListComponent],
  imports: [
    CommonModule,
    WxReplyRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroAntdModule,
    CKEditorModule
  ]
})
export class WxReplyModule { }
