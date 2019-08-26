import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DepartmentRoutingModule} from './department-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {DepartmentEditComponent} from './department-edit/department-edit.component';
import {DepartmentListComponent} from './department-list/department-list.component';
import {NgEditorComponent} from '../../../components/ng-editor/ng-editor.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [DepartmentEditComponent, DepartmentListComponent,
    NgEditorComponent],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroAntdModule,
    CKEditorModule,
  ]
})
export class DepartmentModule {
}
