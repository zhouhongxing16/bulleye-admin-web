import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Help} from '../../../../utils/Help';
import {MenuAuthService} from '../menu-auth.service';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MenuAuth} from '../menu-auth';
import {MenuService} from '../../menu/menu.service';
import {Staff} from '../../staff/staff';

@Component({
  selector: 'app-menu-auth-edit',
  templateUrl: './menu-auth-edit.component.html',
  styleUrls: ['./menu-auth-edit.component.scss']
})
export class MenuAuthEditComponent implements OnInit {


  validateForm: FormGroup;
  isLoading = false;
  obj: MenuAuth = new MenuAuth();
  nodes: null;

  constructor(private formBuilder: FormBuilder,
              private menuAuthService: MenuAuthService,
              private menuService: MenuService,
              private route: ActivatedRoute,
              private help: Help) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.get('id')) {
          const menuId = params.get('id');
          this.obj.menuId = menuId;
          return this.menuAuthService.getById(menuId);
        } else {
          return of(new MenuAuth());
        }
      })
    ).subscribe(d => {
      if (d.success) {
        this.obj = d.data;
      } else {
        this.obj = new MenuAuth();
      }
    });
    this.getAllMenus();
    this.validateForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      path: [null, [Validators.required]],
      menuId: [null, [Validators.required]],
      status: [null, [Validators.required]],
      remark: [],
    });
  }

  getAllMenus() {
    this.menuService.getAllMenus().subscribe(msg => {
      if (msg.success) {
        this.nodes = msg.data;
      }
    });
  }

  submitForm() {
    this.isLoading = true;
    this.menuAuthService.saveOrUpdateData(this.obj).subscribe(res => {
      this.isLoading = false;
      if (res.success) {
        this.help.showMessage('success', res.message);
        this.help.back();
      }
    });
  }

}
