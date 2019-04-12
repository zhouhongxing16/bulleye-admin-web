import { Injectable } from '@angular/core';
import {BaseService} from '../../../utils/base.service';
import {Role} from './role';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends BaseService<Role> {
  url = {
    listByPage: '/role/listByPage',
    create: '/role/create',
    deleteById: '/role/delete',
    getById: '/role/getById',
    update: '/role/update',
    view: '',
    edit: '',
    add: '',
  };
}
