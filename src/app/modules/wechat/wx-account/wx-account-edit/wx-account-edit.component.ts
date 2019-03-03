import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Help} from '../../../../utils/Help';
import {WxAccountService} from '../wx-account.service';

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

  ngOnInit() {
  }

}
