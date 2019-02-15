import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StaffEditComponent } from './staff-edit/staff-edit.component';

@NgModule({
  declarations: [StaffListComponent, StaffEditComponent],
  imports: [
    CommonModule,
    StaffRoutingModule
  ]
})
export class StaffModule { }
