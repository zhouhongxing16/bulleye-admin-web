import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {Help} from '../../../utils/Help';
import {Menu} from './menu';
import {BaseService} from '../../../utils/base.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService extends BaseService<Menu> {

  url = {
    listByPage: '/menu/listByPage',
    create: '/menu/create',
    deleteById: '/menu/delete',
    getById: '/menu/getById',
    update: '/menu/update',
    view: '',
    edit: '',
    add: '',
    getAllMenus: '/menu/getAllMenus',
    getOrganizationMenus: '/menu/getOrganizationMenus',
  };


  getAllMenus() {
    return this.help.post(this.url.getAllMenus, null);
  }

  getOrganizationMenus(params) {
    return this.help.post(this.url.getOrganizationMenus, params);
  }
}
