import {Component, OnInit} from '@angular/core';
import {Help} from '../../../../utils/Help';
import {MenuService} from '../menu.service';
import {Menu} from '../menu';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {
  rows: Menu[] = [];
  total = 0;
  pageIndex = 1;
  pageSize = 10;
  sortValue = null;
  sortKey = null;
  loading = false;

  constructor(private menuService: MenuService, private help: Help) {
  }

  ngOnInit() {
    this.getListByPage();
  }

  getListByPage(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.menuService.getListByPage(this.pageIndex, this.pageSize).subscribe(data => {
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
    this.menuService.deleteById(id).subscribe(res => {
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
