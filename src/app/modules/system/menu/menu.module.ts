import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuListComponent } from './menu-list/menu-list.component';
import { MenuEditComponent } from './menu-edit/menu-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {CommonPipeModule} from '../../common/common-pipe.module';

@NgModule({
  declarations: [MenuListComponent, MenuEditComponent],
    imports: [
        CommonModule,
        MenuRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NgZorroAntdModule,
        CommonPipeModule
    ]
})
export class MenuModule { }
