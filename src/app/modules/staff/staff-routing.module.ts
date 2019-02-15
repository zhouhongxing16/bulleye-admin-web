import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StaffListComponent} from './staff-list/staff-list.component';
import {StaffEditComponent} from './staff-edit/staff-edit.component';

const routes: Routes = [
  {path: '', component: StaffListComponent},
  {path: 'edit', component: StaffEditComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
