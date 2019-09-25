import {Component} from '@angular/core';
import {StaffService} from '../staff.service';
import {Help} from '../../../../utils/Help';
import {Staff} from '../staff';
import {ActivatedRoute} from '@angular/router';
import {BaseListComponent} from '../../../../components/base-list/base-list.component';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss'],
})
export class StaffListComponent extends BaseListComponent<Staff> {

  constructor(staffService: StaffService, help: Help, router: ActivatedRoute) {
    super(staffService, help, router);
  }

}
