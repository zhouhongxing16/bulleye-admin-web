import { Injectable } from '@angular/core';
import {Help} from '../../../utils/Help';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {MenuAuth} from './menu-auth';
import {BaseService} from '../../../utils/base.service';

@Injectable({
  providedIn: 'root'
})
export class MenuAuthService extends BaseService<MenuAuth> {

  url = {
    listByPage: '/menuauth/listByPage',
    create: '/menuauth/create',
    deleteById: '/menuauth/delete',
    getById: '/menuauth/getById',
    update: '/menuauth/update',
    view: '',
    edit: '',
    add: '',
  };
}
