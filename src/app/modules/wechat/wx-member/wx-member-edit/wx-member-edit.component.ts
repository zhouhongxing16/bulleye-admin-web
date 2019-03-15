import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Help} from '../../../../utils/Help';
import {WxMemberService} from '../wx-member.service';
import {WxAccount} from '../../wx-account/wx-account';
import {WxMember} from '../wx-member';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'app-wx-member-edit',
  templateUrl: './wx-member-edit.component.html',
  styleUrls: ['./wx-member-edit.component.scss']
})
export class WxMemberEditComponent implements OnInit {

  validateForm: FormGroup;
  isLoading = false;
  obj: WxMember = new WxMember();

  constructor(private formBuilder: FormBuilder,
              private wxMemberService: WxMemberService,
              private route: ActivatedRoute,
              private help: Help) {
  }

  ngOnInit() {

  }

}
