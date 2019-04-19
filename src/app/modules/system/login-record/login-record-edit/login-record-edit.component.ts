import {Component, OnInit} from '@angular/core';
import {Help} from '../../../../utils/Help';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginRecord} from '../LoginRecord';
import {LoginRecordService} from '../login-record.service';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'app-login-record-edit',
  templateUrl: './login-record-edit.component.html',
  styleUrls: ['./login-record-edit.component.scss']
})
export class LoginRecordEditComponent implements OnInit {


  validateForm: FormGroup;
  isLoading = false;
  obj: LoginRecord = new LoginRecord();

  constructor(
    private formBuilder: FormBuilder,
    private loginRecordService: LoginRecordService,
    private route: ActivatedRoute,
    private help: Help) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.get('id')) {
          return this.loginRecordService.getById(params.get('id'));
        } else {
          return of(new LoginRecord());
        }
      })
    ).subscribe(d => {
      if (d.success) {
        this.obj = d.data;
      } else {
        this.obj = new LoginRecord();
      }
    });

    this.validateForm = this.formBuilder.group({

      id: [null, [Validators.required]],

      username: [null, [Validators.required]],

      ip: [null, [Validators.required]],

      loginLocation: [null, [Validators.required]],

      browser: [null, [Validators.required]],

      os: [null, [Validators.required]],

      status: [null, [Validators.required]],

      message: [null, [Validators.required]],

      created: [null, [Validators.required]],

    });
  }

  submitForm() {
    this.isLoading = true;
    this.loginRecordService.saveOrUpdateData(this.obj).subscribe(res => {
      this.isLoading = false;
      if (res.success) {
        this.help.showMessage('success', res.message);
        this.help.back();
      }
    });
  }

}
