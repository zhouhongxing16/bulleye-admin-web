import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Help} from '../../../../utils/Help';
import {WxMemberService} from '../wx-member.service';

@Component({
  selector: 'app-wx-member-edit',
  templateUrl: './wx-member-edit.component.html',
  styleUrls: ['./wx-member-edit.component.scss']
})
export class WxMemberEditComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private wxMemberService: WxMemberService,
              private route: ActivatedRoute,
              private help: Help) {
  }

  ngOnInit() {
  }

}
