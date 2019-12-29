import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Help} from '../../utils/Help';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
  passwordChangeModalFalse: boolean;

  validateForm: FormGroup;

  constructor(
    public help: Help,
    private modalService: NzModalService,
    private message: NzMessageService,
    private router: Router,
    private fb: FormBuilder
  ) {


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
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      nickname: [null],
      required: [false]
    });
  }

  goToProfile() {
    console.log(this.userInfo.id);
    this.router.navigate(['/staff/edit', this.userInfo.id]);
  }

  showChangePasswordModal() {
    this.passwordChangeModalFalse = true;
  }

  closeModal() {
    this.passwordChangeModalFalse = false;
  }

  showLogoutConfirm(): void {
    this.modalService.confirm({
      nzTitle: '<i>确定注销登录吗?</i>',
      nzContent: '<b>注销后需要重新登录</b>',
      nzOnOk: () => {
        localStorage.removeItem('token');
        window.location.reload();
      }
    });
  }

  getMenu() {
    const that = this;
    this.help.post('/menu/getMenusByAccountId', null).subscribe(msg => {
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


  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  requiredChange(required: boolean): void {
    if (!required) {
      this.validateForm.get('nickname')!.clearValidators();
      this.validateForm.get('nickname')!.markAsPristine();
    } else {
      this.validateForm.get('nickname')!.setValidators(Validators.required);
      this.validateForm.get('nickname')!.markAsDirty();
    }
    this.validateForm.get('nickname')!.updateValueAndValidity();
  }
}
