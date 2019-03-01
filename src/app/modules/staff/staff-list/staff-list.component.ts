import {Component, OnInit} from '@angular/core';
import {StaffService} from '../staff.service';
import {Help} from '../../../utils/Help';
import {Observable, of} from 'rxjs';
import {Staff} from '../staff';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss'],
})
export class StaffListComponent implements OnInit {
  allChecked = false;
  indeterminate = false;
  rows: Staff[] = [];
  total = 0;
  pageIndex = 1;
  pageSize = 10;
  sortValue = null;
  sortKey = null;
  loading = false;
  private search = '';


  private flag = false;
  filterGender = [
    {text: 'male', value: 'male'},
    {text: 'female', value: 'female'}
  ];
  searchGenderList: string[] = [];

  constructor(private staffService: StaffService, private help: Help) {

  }

  ngOnInit() {
    this.pageIndex = this.staffService.pageNum;
    this.pageSize = this.staffService.pageSize;
    this.getListByPage();
  }

  getListByPage(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.staffService.getListByPage(this.pageIndex, this.pageSize).subscribe(data => {
      this.loading = false;
      this.rows = data.rows;
      this.total = data.total;
    }, err => {
      this.loading = false;
      this.help.showMessage('error', `请求出现错误: ${JSON.stringify(err)}`);
    });
  }

  updateFilter(value: string[]): void {
    this.searchGenderList = value;
    this.getListByPage(true);
  }

  deleteRow(id: string) {
    this.help.loading('删除中...');
    this.staffService.deleteById(id).subscribe(res => {
      if (res.success) {
        this.help.stopLoad();
        this.help.showMessage('success', res.message);
        this.getListByPage(true);
      } else {
        this.help.showMessage('error', res.message);
      }
    });
  }


}
