import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Help} from '../../../../utils/Help';
import {WxMenuService} from '../wx-menu.service';
import {WxAccount} from '../../wx-account/wx-account';

@Component({
  selector: 'app-wx-menu-edit',
  templateUrl: './wx-menu-edit.component.html',
  styleUrls: ['./wx-menu-edit.component.scss']
})
export class WxMenuEditComponent implements OnInit {

  validateForm: FormGroup;
  isLoading = false;
  obj:WxAccount = new WxAccount();

  constructor(private formBuilder: FormBuilder,
              private wxMenuService: WxMenuService,
              private route: ActivatedRoute,
              private help: Help) {
  }

  ngOnInit() {
  }

}
