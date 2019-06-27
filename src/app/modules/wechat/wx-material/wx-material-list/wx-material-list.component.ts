import {Component, OnInit} from '@angular/core';
import {WxMenu} from "../../wx-menu/wx-menu";
import {WxAccount} from "../../wx-account/wx-account";
import {Help} from "../../../../utils/Help";
import {WxAccountService} from "../../wx-account/wx-account.service";
import {WxMaterialService} from "../wx-material.service";
import {WxMaterial} from "../wx-material";

@Component({
  selector: 'app-wx-material-list',
  templateUrl: './wx-material-list.component.html',
  styleUrls: ['./wx-material-list.component.scss']
})
export class WxMaterialListComponent implements OnInit {

  rows: WxMaterial[] = [];
  wxAccounts: WxAccount[] = [];//可选的微信号
  loading = false;
  chooseWxAccountId = '';//选中的微信accountid

  total = 0;
  pageIndex = 1;
  pageSize = 10;

  //方法开始全选多选
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData = [];
  mapOfCheckedId = {};

  constructor(private wxMaterialService: WxMaterialService,
              private help: Help,
              private wxAccountService: WxAccountService) {
  }

  ngOnInit() {
    this.getWxaccount();
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

  getWxaccount() {
    this.wxAccountService.getListByParams({}).subscribe(data => {
      console.log(data.data);
      this.wxAccounts = data.data;
      this.chooseWxAccountId = this.wxAccounts[0].id;
      this.getListByPage(true, this.wxAccounts[0].id);
    }, err => {
    });
  }

  getListByPage(reset: boolean = false, accountId: string) {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.wxMaterialService.getListByPage(this.pageIndex, this.pageSize, {accountId:accountId}).subscribe(data => {
      this.loading = false;
      this.rows = data.rows;
      this.total = data.total;
    }, err => {
      this.loading = false;
      this.help.showMessage('error', `请求出现错误: ${JSON.stringify(err)}`);
    });
  }


}
