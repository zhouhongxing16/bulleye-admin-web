import { Injectable } from '@angular/core';
import {BaseService} from '../../../utils/base.service';
import {Role} from '../role/role';

@Injectable({
  providedIn: 'root'
})
export class MonitorService extends BaseService<Role> {
  url = {
    listByPage: '/role/listByPage',
    create: '/role/create',
    deleteById: '/role/delete',
    getById: '/role/getById',
    update: '/role/update',
    view: '',
    edit: '',
    add: '',
    getInfo: '/monitor/getInfo',
  };

  getInfo() {
    return this.help.get(this.url.getInfo);
  }
}
