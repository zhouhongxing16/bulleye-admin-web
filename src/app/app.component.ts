import {Component} from '@angular/core';
import {Help} from './utils/Help';
import {NzModalService} from 'ng-zorro-antd';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [NzModalService]
})
export class AppComponent {
  title = 'bulleye-admin-web';
  menus: any;
  userInfo: any;
  loginFlag: boolean;

  constructor(private help: Help, private modalService: NzModalService) {
    const token = localStorage.getItem('token');
    if (token) {
      this.getMenu();
    } else {
      this.loginFlag = true;
    }

  }
  handleOk(): void {
    this.loginFlag = false;
  }

  handleCancel(): void {
    this.loginFlag = false;
  }
  showLogoutConfirm(): void {
    this.modalService.confirm({
      nzTitle: '<i>确定注销登录吗?</i>',
      nzContent: '<b>注销后需要重新登录</b>',
      nzOnOk: () => {
        localStorage.removeItem('token');
        console.log('OK');
      }
    })
    ;
  }

  login() {
    const that = this;
    this.help.post('http://localhost:8088/login', {username: 'zhx', password: '1'}).subscribe(msg => {
      if (msg.success) {
        localStorage.setItem('token', msg.data.token);
        that.userInfo = msg.data.userInfo;
      }
      console.log(msg);
    });
  }

  getMenu() {
    const that = this;
    this.help.post('http://localhost:8088/menu/getAllMenus', {username: 'zhx', password: '1'}).subscribe(msg => {
      if (msg.success) {
        that.menus = msg.data;
      } else {
        console.log(msg);
      }
    });
  }
}
