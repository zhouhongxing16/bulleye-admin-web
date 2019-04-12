import {Injectable} from '@angular/core';
import {Help} from '../../../utils/Help';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {WxMenu} from './wx-menu';
import {BaseService} from '../../../utils/base.service';

@Injectable({
  providedIn: 'root'
})
export class WxMenuService extends BaseService<WxMenu> {

  url = {
    listByPage: '/wxmenu/listByPage',
    create: '/wxmenu/create',
    deleteById: '/wxmenu/delete',
    getById: '/wxmenu/getById',
    update: '/wxmenu/update',
    view: '',
    edit: '',
    add: '',
    getWxMenu: '/wxmenu/getWxMenu',
    createWxMenu: '/wxmenu/createWxMenu',
  };

  getWxMenu(accountId: string) {
    return this.help.get(this.url.getWxMenu + `/` + accountId);
  }

  createWxMenu(accountId: string) {
    return this.help.get(this.url.createWxMenu + `/` + accountId);
  }
}
