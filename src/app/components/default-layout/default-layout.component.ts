import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Help} from '../../utils/Help';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {

  title = 'bulleye-admin-web';
  userInfo: any;
  menus: any;
  triggerTemplate: TemplateRef<void> | null = null;

  constructor(public help: Help, private modalService: NzModalService, private message: NzMessageService) {


  }

  @ViewChild('trigger') customTrigger: TemplateRef<void>;

  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    this.getMenu();
    if (token) {
      this.getStaffInfo();
    }
  }

  showLogoutConfirm(): void {
    this.modalService.confirm({
      nzTitle: '<i>确定注销登录吗?</i>',
      nzContent: '<b>注销后需要重新登录</b>',
      nzOnOk: () => {
        localStorage.removeItem('token');
        console.log('OK');
      }
    });
  }

  getMenu() {
    const that = this;
    this.help.post('/menu/getAllMenus', null).subscribe(msg => {
      if (msg.success) {
        that.menus = msg.data;
      } else {
        this.message.create('error', msg.message);
        console.log(msg);
      }
    });
  }

  login() {
    const that = this;
    this.help.post('/login', {username: 'zhx', password: '1'}).subscribe(msg => {
      if (msg.success) {
        that.help.showMessage('success', msg.message);
        localStorage.setItem('token', msg.data.token);
      } else {
        that.help.showMessage('error', msg.message);
      }
      console.log(msg);
    });
  }

  getStaffInfo() {
    const that = this;
    this.help.get('/staff/getStaffInfo').subscribe(msg => {
      if (msg.success) {
        that.userInfo = msg.data;
      } else {
        this.message.create('error', msg.message);
        console.log(msg);
      }
    });
  }

  testAuth() {
    const that = this;
    this.help.post('/staff/list', {username: 'zhx', password: '1'}).subscribe(msg => {
      if (msg.success) {
        that.menus = msg.data;
      } else {
        console.log(msg);
      }
    });
  }
}
