import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Help} from '../../../../utils/Help';
import {WxMenuService} from '../wx-menu.service';
import {WxAccount} from '../../wx-account/wx-account';
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

  constructor(private formBuilder: FormBuilder,
              private wxMenuService: WxMenuService,
              private route: ActivatedRoute,
              private help: Help) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.get('id')) {
          return this.wxMenuService.getById(params.get('id'));
        } else {
          return of(new WxMenu());
        }
      })
    ).subscribe(d => {
      if (d.success) {
        this.obj = d.data;
      } else {
        this.obj = new WxMenu();
      }
    });

    this.validateForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      remark: [null, [Validators.required]],
      status: [null, [Validators.required]],
      menuState: [null]
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
