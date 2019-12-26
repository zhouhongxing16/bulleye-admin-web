import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitorRoutingModule } from './monitor-routing.module';
import { MonitorListComponent } from './monitor-list/monitor-list.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';

@NgModule({
  declarations: [MonitorListComponent],
  imports: [
    CommonModule,
    MonitorRoutingModule,
    NgZorroAntdModule
  ]
})
export class MonitorModule { }
