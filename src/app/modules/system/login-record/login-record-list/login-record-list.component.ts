import {Component, OnInit} from '@angular/core';
import {LoginRecord} from '../LoginRecord';
import {Help} from '../../../../utils/Help';
import {LoginRecordService} from '../login-record.service';

@Component({
  selector: 'app-login-record-list',
  templateUrl: './login-record-list.component.html',
  styleUrls: ['./login-record-list.component.scss']
})
export class LoginRecordListComponent implements OnInit {

  rows: LoginRecord[] = [];
  total = 0;
  pageIndex = 1;
  pageSize = 10;
  loading = false;
  searchGenderList: string[] = [];

  constructor(private loginRecordService: LoginRecordService, private help: Help) {

  }

  ngOnInit() {
    this.getListByPage();
  }

  getListByPage(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.loginRecordService.getListByPage(this.pageIndex, this.pageSize, {}).subscribe(data => {
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
    this.loginRecordService.deleteById(id).subscribe(res => {
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
