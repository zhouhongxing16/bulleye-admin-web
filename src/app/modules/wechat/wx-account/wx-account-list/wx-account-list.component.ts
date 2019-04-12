import {Component, OnInit} from '@angular/core';
import {Help} from '../../../../utils/Help';
import {WxAccountService} from '../wx-account.service';
import {WxAccount} from '../wx-account';

@Component({
  selector: 'app-wx-account-list',
  templateUrl: './wx-account-list.component.html',
  styleUrls: ['./wx-account-list.component.scss']
})
export class WxAccountListComponent implements OnInit {
  rows: WxAccount[] = [];
  total = 0;
  pageIndex = 1;
  pageSize = 10;
  sortValue = null;
  sortKey = null;
  loading = false;

  //方法开始全选多选
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData = [];
  mapOfCheckedId = {};

  currentPageDataChange($event: Array<{}>): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData.every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate = this.listOfDisplayData.some(item => this.mapOfCheckedId[item.id]) && !this.isAllDisplayDataChecked;
  }

  checkAll(value: boolean): void {
    this.listOfDisplayData.forEach(item => this.mapOfCheckedId[item.id] = value);
    this.refreshStatus();
  }
  //多选删除
  deleteOfChecked() {
    var ids = [];
    for (var p1 in this.mapOfCheckedId) {
      if (this.mapOfCheckedId.hasOwnProperty(p1) && this.mapOfCheckedId[p1])
        ids.push(p1);
    }
  }

  constructor(private wxAccountService: WxAccountService, private help: Help) {
  }

  ngOnInit() {
    this.getListByPage();
  }

  getListByPage(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.wxAccountService.getListByPage(this.pageIndex, this.pageSize, {}).subscribe(data => {
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
    this.wxAccountService.deleteById(id).subscribe(res => {
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
