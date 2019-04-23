import {Component, OnInit} from '@angular/core';
import {Help} from '../../../../utils/Help';
import {MenuAuth} from '../menu-auth';
import {MenuAuthService} from '../menu-auth.service';
import {ActivatedRoute} from '@angular/router';
import {MenuService} from '../../menu/menu.service';

@Component({
  selector: 'app-menu-auth-list',
  templateUrl: './menu-auth-list.component.html',
  styleUrls: ['./menu-auth-list.component.scss']
})
export class MenuAuthListComponent implements OnInit {

  rows: MenuAuth[] = [];
  total = 0;
  pageIndex = 1;
  pageSize = 10;
  loading = false;
  nodes = null;
  queryParams = {
    menuId: null
  };

  constructor(
    private menuAuthService: MenuAuthService,
    private menuService: MenuService,
    private help: Help,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe((param) => {
      if (param.id != null) {
        this.queryParams.menuId = param.id;
      } else {
        this.queryParams.menuId = null;
      }
      this.getListByPage(false);
      this.getAllMenus();
    });
  }

  getAllMenus() {
    this.menuService.getAllMenus().subscribe(msg => {
      if (msg.success) {
        this.nodes = msg.data;
      }
    });
  }

  getListByPage(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.menuAuthService.getListByPage(this.pageIndex, this.pageSize, {menuId:  this.queryParams.menuId}).subscribe(data => {
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
    this.menuAuthService.deleteById(id).subscribe(res => {
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
