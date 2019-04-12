import { Injectable } from '@angular/core';
import {Help} from '../../../utils/Help';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {WxAccount} from './wx-account';
import {BaseService} from '../../../utils/base.service';

@Injectable({
  providedIn: 'root'
})
export class WxAccountService extends BaseService<WxAccount> {
  url = {
    listByPage: '/wxaccount/listByPage',
    create: '/wxaccount/create',
    deleteById: '/wxaccount/delete',
    getById: '/wxaccount/getById',
    update: '/wxaccount/update',
    select: '/wxaccount/select',
    view: '',
    edit: '',
    add: '',
  };

  select(wxAccount: WxAccount): Observable<any> {
    return this.help.post(`${this.url.select}`, wxAccount).pipe(
      map(res => {
        this.data = {
          rows: res.list,
          total: res.list.length
        };
        return this.data;
      }));
  }
}
