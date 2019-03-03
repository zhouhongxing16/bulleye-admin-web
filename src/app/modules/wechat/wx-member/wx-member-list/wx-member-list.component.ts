import {Component, OnInit} from '@angular/core';
import {Help} from '../../../../utils/Help';
import {WxMemberService} from '../wx-member.service';
import {WxMember} from '../wx-member';

@Component({
  selector: 'app-wx-member-list',
  templateUrl: './wx-member-list.component.html',
  styleUrls: ['./wx-member-list.component.scss']
})
export class WxMemberListComponent implements OnInit {
  rows: WxMember[] = [];
  total = 0;
  pageIndex = 1;
  pageSize = 10;
  sortValue = null;
  sortKey = null;
  loading = false;

  constructor(private wxMemberService: WxMemberService, private help: Help) {
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
    this.wxMemberService.getListByPage(this.pageIndex, this.pageSize).subscribe(data => {
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
    this.wxMemberService.deleteById(id).subscribe(res => {
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
