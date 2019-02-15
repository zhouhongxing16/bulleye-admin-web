import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuListComponent } from './menu-list/menu-list.component';
import { MenuEditComponent } from './menu-edit/menu-edit.component';

@NgModule({
  declarations: [MenuListComponent, MenuEditComponent],
  imports: [
    CommonModule,
    MenuRoutingModule
  ]
})
export class MenuModule { }
