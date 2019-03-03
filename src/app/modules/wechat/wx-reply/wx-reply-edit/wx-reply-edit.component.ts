import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Help} from '../../../../utils/Help';
import {WxReplyService} from '../wx-reply.service';

@Component({
  selector: 'app-wx-reply-edit',
  templateUrl: './wx-reply-edit.component.html',
  styleUrls: ['./wx-reply-edit.component.scss']
})
export class WxReplyEditComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private wxReplyService: WxReplyService,
              private route: ActivatedRoute,
              private help: Help) {
  }

  ngOnInit() {
  }

}
