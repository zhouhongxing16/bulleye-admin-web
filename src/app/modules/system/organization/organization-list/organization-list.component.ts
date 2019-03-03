import { Component, OnInit } from '@angular/core';
import {Help} from '../../../../utils/Help';
import {Organization} from '../organization';
import {OrganizationService} from '../organization.service';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent implements OnInit {
  rows: Organization[] = [];
  total = 0;
  pageIndex = 1;
  pageSize = 10;
  sortValue = null;
  sortKey = null;
  loading = false;

  constructor(private organizationService: OrganizationService, private help: Help) {
  }


  ngOnInit() {
    this.getListByPage();
  }


  getListByPage(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.organizationService.getListByPage(this.pageIndex, this.pageSize).subscribe(data => {
      this.loading = false;
      this.rows = data.rows;
      this.total = data.total;
    }, err => {
      this.loading = false;
      this.help.showMessage('error', `请求出现错误: ${JSON.stringify(err)}`);
    });
  }

  deleteRow(id: string) {
    this.help.loading('删除中...');
    this.organizationService.deleteById(id).subscribe(res => {
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
