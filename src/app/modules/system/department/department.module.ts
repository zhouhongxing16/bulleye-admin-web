import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DepartmentRoutingModule} from './department-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {DepartmentEditComponent} from './department-edit/department-edit.component';
import {DepartmentListComponent} from './department-list/department-list.component';

@NgModule({
  declarations: [DepartmentEditComponent, DepartmentListComponent],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroAntdModule
  ]
})
export class DepartmentModule {
}
