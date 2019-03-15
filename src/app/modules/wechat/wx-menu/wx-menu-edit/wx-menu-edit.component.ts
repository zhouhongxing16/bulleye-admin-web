import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Help} from '../../../../utils/Help';
import {WxMenuService} from '../wx-menu.service';
import {WxAccount} from '../../wx-account/wx-account';
import {WxMenu} from '../wx-menu';

@Component({
  selector: 'app-wx-menu-edit',
  templateUrl: './wx-menu-edit.component.html',
  styleUrls: ['./wx-menu-edit.component.scss']
})
export class WxMenuEditComponent implements OnInit {

  validateForm: FormGroup;
  isLoading = false;
  obj: WxMenu = new WxMenu();

  constructor(private formBuilder: FormBuilder,
              private wxMenuService: WxMenuService,
              private route: ActivatedRoute,
              private help: Help) {
  }

  ngOnInit() {
  }

}
