import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {Help} from '../../utils/Help';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [NzModalService]
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;

  submitForm(): void {
    const that = this;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    console.log();
    if (this.validateForm.valid) {
      this.help.post('http://localhost:8001/login', this.validateForm.value).subscribe(msg => {
        if (msg.success) {
          localStorage.setItem('token', msg.data.token);
          this.message.create('success', msg.message);
          console.log(msg);
          window.location.reload();
        } else {
          this.message.create('error', msg.message);
          console.log(msg);
        }
      });
    }
  }

  constructor(private fb: FormBuilder, private help: Help, private message: NzMessageService) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

}
