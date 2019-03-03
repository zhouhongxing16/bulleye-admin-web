import { Injectable } from '@angular/core';
import {Help} from '../../../utils/Help';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {WxReply} from './wx-reply';

@Injectable({
  providedIn: 'root'
})
export class WxReplyService {


  flag = false;
  pageSize = 10;
  pageNum = 1;
  data = {
    rows: [],
    total: 0
  };
  private url = {
    listByPage: 'http://localhost:8001/wxreply/listByPage',
    create: 'http://localhost:8001/wxreply/create',
    deleteById: 'http://localhost:8001/wxreply/delete',
    getById: 'http://localhost:8001/wxreply/getById',
    update: 'http://localhost:8001/wxreply/update',
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
      map((dataList: WxReply[]) => dataList.find(data => data.id === id))
    );
  }
}
