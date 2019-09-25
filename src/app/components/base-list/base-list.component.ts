import {OnInit} from '@angular/core';
import {BaseService} from '../../utils/base.service';
import {Help} from '../../utils/Help';
import {ActivatedRoute} from '@angular/router';

export class BaseListComponent<T> implements OnInit {

  rows: any = [];
  total = 0;
  pageIndex = 1;
  pageSize = 10;
  loading = false;
  authData: any = {
    auths: [],
    flag: false
  };

  constructor(private service: BaseService<T>, private help: Help, private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.router.queryParamMap.subscribe(params => {
      console.log( params);
    });
    this.getListByPage();
  }

  getListByPage(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.service.getListByPage(this.pageIndex, this.pageSize, {}).subscribe(data => {
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
    this.service.deleteById(id).subscribe(res => {
      if (res.success) {
        this.help.stopLoad();
        this.help.showMessage('success', res.message);
        this.getListByPage(true);
      } else {
        this.help.showMessage('error', res.message);
      }
    });
  }

  initAuth(code: string) {
    if (this.authData.flag) {
      for (let i = 0; i < this.authData.auths.length; i++) {
        if (this.authData.auths[i].code === code) {
          return true;
        }
      }
    } else {
      return false;
    }


  }
}