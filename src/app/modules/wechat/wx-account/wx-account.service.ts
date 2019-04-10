import { Injectable } from '@angular/core';
import {Help} from '../../../utils/Help';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {WxAccount} from './wx-account';

@Injectable({
  providedIn: 'root'
})
export class WxAccountService {


  flag = false;
  pageSize = 10;
  pageNum = 1;
  data = {
    rows: [],
    total: 0
  };
  private url = {
    listByPage: '/wxaccount/listByPage',
    create: '/wxaccount/create',
    deleteById: '/wxaccount/delete',
    getById: '/wxaccount/getById',
    update: '/wxaccount/update',
    select: '/wxaccount/select',
  };
  constructor(private help: Help) {
  }
  getListByPage(pageNum: number = 1, pageSize: number = 10): Observable<any> {
    this.flag = false;
    const params = {
      pageNum: pageNum,
      pageSize: pageSize,
    };
    if (this.flag) {
      return of(this.data);
    } else {
      return this.help.post(`${this.url.listByPage}`, params).pipe(
        map(res => {
          this.flag = true;
          this.data = {
            rows: res.rows,
            total: res.total
          };
          return this.data;
        }));
    }
  }

  saveOrUpdateData(data: any) {
    let url = this.url.create;
    if (data.id) {
      url = this.url.update;
    }
    return this.help.post(url, data);
  }

  deleteById(id: string) {
    return this.help.get(this.url.deleteById + `/` + id);
  }

  getById(id: string) {
    return this.help.get(this.url.getById + `/` + id);
  }

  getObject(id: string) {
    return of(this.data.rows).pipe(
      map((dataList: WxAccount[]) => dataList.find(data => data.id === id))
    );
  }

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
