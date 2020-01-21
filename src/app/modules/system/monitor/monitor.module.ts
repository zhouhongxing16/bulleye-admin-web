import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitorRoutingModule } from './monitor-routing.module';
import { MonitorListComponent } from './monitor-list/monitor-list.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {CodemirrorComponent} from '../../../components/codemirror/codemirror.component';
import {FormsModule} from '@angular/forms';
import {CodemirrorModule} from 'ng2-codemirror';

@NgModule({
    declarations: [MonitorListComponent, CodemirrorComponent],
  imports: [
    CommonModule,
    MonitorRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    CodemirrorModule
  ]
})
export class MonitorModule { }
