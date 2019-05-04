import {Component, OnInit} from '@angular/core';
import {Help} from '../../../../utils/Help';
import {AccountService} from '../account.service';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {
  rows: Account[] = [];
  total = 0;
  pageIndex = 1;
  pageSize = 10;
  isLoading = false;
  roles = [];
  drawerVisible = false;
  listOfSelectedRole = [];

  accountId = null;

  constructor(private accountService: AccountService, private help: Help) {
  }


  ngOnInit() {
    this.getListByPage();
  }


  getListByPage(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
    this.isLoading = true;
    this.accountService.getListByPage(this.pageIndex, this.pageSize, {}).subscribe(data => {
      this.isLoading = false;
      this.rows = data.rows;
      this.total = data.total;
    }, err => {
      this.isLoading = false;
      this.help.showMessage('error', `请求出现错误: ${JSON.stringify(err)}`);
    });
  }

  deleteRow(id: string) {
    this.help.loading('删除中...');
    this.accountService.deleteById(id).subscribe(res => {
      this.help.stopLoad();
      if (res.success) {
        this.help.showMessage('success', res.message);
        this.getListByPage(true);
      } else {
        this.help.showMessage('error', res.message);
      }
    });
  }

  close(): void {
    this.drawerVisible = false;
  }

  saveSelectedRoles(): void {
    console.log(this.listOfSelectedRole);
    this.accountService.saveAccountRoles({roleIds: this.listOfSelectedRole.join(','), accountId: this.accountId}).subscribe(res => {
      this.help.stopLoad();
      if (res.success) {
        this.help.showMessage('success', res.message);
        this.drawerVisible = false;
      } else {
        this.help.showMessage('warning', res.message);
      }
    });

  }

  isNotSelectedRole(value: string): boolean {
    return this.listOfSelectedRole.indexOf(value) === -1;
  }

  openDrawer(id: string) {
    this.accountId = id;
    this.getAllRoles();
    this.getRolesByAccountId(id);
  }

  getAllRoles() {
    const that = this;
    this.drawerVisible = true;
    this.help.loading('加载中...');
    this.accountService.getAllRoles(null).subscribe(res => {
      this.help.stopLoad();
      if (res.success) {
        that.roles = [];
        that.roles = res.data;
      } else {
        this.help.showMessage('error', res.message);
      }
    });
  }

  getRolesByAccountId(id: string) {
    const that = this;
    this.drawerVisible = true;
    this.accountService.getRolesByAccountId(id).subscribe(res => {
      if (res.success) {
        that.listOfSelectedRole = [];
        res.data.forEach(r => {
          that.listOfSelectedRole.push(r.id);
        });
      } else {
        this.help.showMessage('error', res.message);
      }
    });
  }
}
