import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {Help} from '../../utils/Help';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [NzModalService]
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;

  requiredChange(type: string): void{
    if(type=='account'){
      this.validateForm.get('username').clearValidators();
      this.validateForm.get('password').clearValidators();

      this.validateForm.get('username')!.markAsPristine();
      this.validateForm.get('password')!.markAsPristine();
    }else if(type=='phone'){
      this.validateForm.get('mobile').setValidators(Validators.required);
      this.validateForm.get('captcha').setValidators(Validators.required);

      this.validateForm.get('mobile')!.markAsDirty();
      this.validateForm.get('captcha')!.markAsDirty();
    }
  }

  submitForm(): void {
    const that = this;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    console.log();
    if (this.validateForm.valid) {
      this.help.post('/login', this.validateForm.value).subscribe(msg => {
        if (msg.success) {
          localStorage.setItem('token', msg.data.token);
          this.message.create('success', msg.message);
          this.router.navigate(['/']);
        } else {
          this.message.create('error', msg.message);
          console.log(msg);
        }
      });
    }
  }

  constructor(private fb: FormBuilder, private help: Help, private router: Router, private message: NzMessageService) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      mobile: [null],
      captcha: [null],
    });

    this.validateForm.get('username').clearValidators();
    this.validateForm.get('password').clearValidators();

    this.validateForm.get('username')!.markAsPristine();
    this.validateForm.get('password')!.markAsPristine();
  }

}
