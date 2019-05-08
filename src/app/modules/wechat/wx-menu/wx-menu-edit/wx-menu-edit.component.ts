import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Help} from '../../../../utils/Help';
import {WxMenuService} from '../wx-menu.service';
import {WxMenu} from '../wx-menu';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'app-wx-menu-edit',
  templateUrl: './wx-menu-edit.component.html',
  styleUrls: ['./wx-menu-edit.component.scss']
})
export class WxMenuEditComponent implements OnInit {

  validateForm: FormGroup;
  isLoading = false;
  obj: WxMenu = new WxMenu();
  type: string;

  constructor(private formBuilder: FormBuilder,
              private wxMenuService: WxMenuService,
              private route: ActivatedRoute,
              private help: Help) {
  }

  ngOnInit() {
    this.type = this.route.snapshot.queryParams['type'];
    this.route.queryParamMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.get('id')) {
          return this.wxMenuService.getById(params.get('id'));
        } else {
          return of(new WxMenu());
        }
      })
    ).subscribe(d => {
      if (this.type == 'addOne') {
        this.obj = new WxMenu();
        this.obj.parentId = '0';
        this.obj.accountId = this.route.snapshot.queryParams['accountId'];
      } else if (this.type == 'addTwo') {
        this.obj = new WxMenu();
        this.obj.parentId = d.data.id;
        this.obj.accountId = d.data.accountId;
      } else if (this.type == 'edit') {
        this.obj = d.data;
      }
      console.log(this.obj);
    });

    this.validateForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      type: [null, [Validators.required]],
      author: [null, [Validators.required]],
      sort: [null, [Validators.required]],
      mediaId: [null],
      appId: [null],
      pagePath: [null],
      remark: [null],
      parentId: [null],
      accountId: [null],
      id: [null],
      keyValue: [null],
      url: [null]
    });
  }

  submitForm() {
    this.isLoading = true;
    this.wxMenuService.saveOrUpdateData(this.obj).subscribe(res => {
      this.isLoading = false;
      if (res.success) {
        this.help.showMessage('success', res.message);
        this.help.back();
      }
    });
  }

}
