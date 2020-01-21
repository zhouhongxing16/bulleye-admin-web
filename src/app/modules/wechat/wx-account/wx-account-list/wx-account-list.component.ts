import {Component, OnInit} from '@angular/core';
import {Help} from '../../../../utils/Help';
import {WxAccountService} from '../wx-account.service';
import {WxAccount} from '../wx-account';
import {WxAccountEditComponent} from '../wx-account-edit/wx-account-edit.component';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {of} from 'rxjs';
import {BaseListComponent} from '../../../../components/base-list/base-list.component';

@Component({
  selector: 'app-wx-account-list',
  templateUrl: './wx-account-list.component.html',
  styleUrls: ['./wx-account-list.component.scss']
})
export class WxAccountListComponent extends BaseListComponent<WxAccount> {
  rows: WxAccount[] = [];
  total = 0;
  pageIndex = 1;
  pageSize = 8;
  sortValue = null;
  sortKey = null;
  loading = false;

  // 方法开始全选多选
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData = [];
  mapOfCheckedId = {};


  constructor( wxAccountService: WxAccountService,  help: Help,  route: ActivatedRoute, router: Router) {
    super(wxAccountService, help, route, router);
  }

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
}
