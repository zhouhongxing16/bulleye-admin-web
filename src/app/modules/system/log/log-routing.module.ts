
  import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogListComponent} from './log-list/log-list.component';
import { LogEditComponent} from './log-edit/log-edit.component';

const routes: Routes = [
  {path: 'list', component: LogListComponent},
  {path: 'edit/:id', component: LogEditComponent},
  {path: 'add', component: LogEditComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogRoutingModule { }
