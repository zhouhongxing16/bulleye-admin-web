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
    getRoleMenus: '/menu/getRoleMenus',
    getCheckedLeafMenus: '/menu/getCheckedLeafMenus',
  };

  saveRoleMenus(params) {
    return this.help.post(this.url.getRoleMenus, params);
  }

  getCheckedLeafMenus(data: any) {
    return this.help.post(this.url.getCheckedLeafMenus, data);
  }
}
