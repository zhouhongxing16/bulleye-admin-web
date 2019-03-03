import {Component, OnInit} from '@angular/core';
import {WxReplyService} from '../wx-reply.service';
import {Help} from '../../../../utils/Help';
import {WxReply} from '../wx-reply';

@Component({
  selector: 'app-wx-reply-list',
  templateUrl: './wx-reply-list.component.html',
  styleUrls: ['./wx-reply-list.component.scss']
})
export class WxReplyListComponent implements OnInit {
  rows: WxReply[] = [];
  total = 0;
  pageIndex = 1;
  pageSize = 10;
  sortValue = null;
  sortKey = null;
  loading = false;

  constructor(private wxReplyService: WxReplyService, private help: Help) {
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
    this.wxReplyService.getListByPage(this.pageIndex, this.pageSize).subscribe(data => {
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
    this.wxReplyService.deleteById(id).subscribe(res => {
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
