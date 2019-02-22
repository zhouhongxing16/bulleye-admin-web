import {Component, OnInit, ViewChild} from '@angular/core';
import {StaffService} from '../staff.service';
import {Help} from '../../../utils/Help';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss'],
})
export class StaffListComponent implements OnInit {

  pageIndex = 1;
  pageSize = 10;
  total = 1;
  dataSet = [];
  loading = true;
  sortValue = null;
  sortKey = null;
  filterGender = [
    {text: 'male', value: 'male'},
    {text: 'female', value: 'female'}
  ];
  searchGenderList: string[] = [];

  constructor(private staffService: StaffService, private help: Help) {
  }

  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.staffService.getList(this.pageIndex, this.pageSize, this.sortKey, this.sortValue, this.searchGenderList).subscribe((data: any) => {
      this.loading = false;
      this.total = data.total;
      this.dataSet = data.rows;
    });
  }

  updateFilter(value: string[]): void {
    this.searchGenderList = value;
    this.searchData(true);
  }


  sort(sort: { key: string, value: string }): void {
    this.sortKey = sort.key;
    this.sortValue = sort.value;
    this.searchData();
  }

  deleteRow(id: string) {
    this.help.loading('删除中...');
    this.staffService.deleteById(id).subscribe(res => {
      if (res.success) {
        this.help.stopLoad();
        this.help.showMessage('success', res.message);
        this.searchData(true);
      } else {
        this.help.showMessage('error', res.message);
      }
    });
  }

  ngOnInit() {
    this.searchData(true);
  }

}
