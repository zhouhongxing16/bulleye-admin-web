import {Component, OnInit} from '@angular/core';
import {WxMenuService} from '../wx-menu.service';
import {Help} from '../../../../utils/Help';
import {WxMenu} from '../wx-menu';

@Component({
  selector: 'app-wx-menu-list',
  templateUrl: './wx-menu-list.component.html',
  styleUrls: ['./wx-menu-list.component.scss']
})
export class WxMenuListComponent implements OnInit {

  rows: WxMenu[] = [];
  total = 0;
  pageIndex = 1;
  pageSize = 10;
  sortValue = null;
  sortKey = null;
  loading = false;

  constructor(private wxMenuService: WxMenuService, private help: Help) {
  }

  ngOnInit() {
  }


  ngOnInit() {
    this.getListByPage();
  }

  getListByPage(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.wxMenuService.getListByPage(this.pageIndex, this.pageSize).subscribe(data => {
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
    this.wxMenuService.deleteById(id).subscribe(res => {
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
