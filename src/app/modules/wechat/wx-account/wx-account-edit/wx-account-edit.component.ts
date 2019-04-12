import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Help} from '../../../../utils/Help';
import {WxAccountService} from '../wx-account.service';
import {WxAccount} from '../wx-account';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'app-wx-account-edit',
  templateUrl: './wx-account-edit.component.html',
  styleUrls: ['./wx-account-edit.component.scss']
})
export class WxAccountEditComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private wxAccountService: WxAccountService,
              private route: ActivatedRoute,
              private help: Help) {
  }

  validateForm: FormGroup;
  isLoading = false;
  obj: WxAccount = new WxAccount();

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.get('id')) {
          return this.wxAccountService.getById(params.get('id'));
        } else {
          return of(new WxAccount());
        }
      })
    ).subscribe(d => {
      if (d.success) {
        this.obj = d.data;
      } else {
        this.obj = new WxAccount();
      }
    });

    this.validateForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      sourceId: [null, [Validators.required]],
      appId: [null, [Validators.required]],
      appSecret: [null, [Validators.required]],
      status: [null, [Validators.required]],
      domain: [null],
      remark: [null],
      menuState: [null]
    });
  }

  submitForm() {
    this.isLoading = true;
    this.wxAccountService.saveOrUpdateData(this.obj).subscribe(res => {
      this.isLoading = false;
      if (res.success) {
        this.help.showMessage('success', res.message);
        this.help.back();
      }
    });
  }

}
