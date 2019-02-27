import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Help} from '../../utils/Help';
import {map} from 'rxjs/operators';
import {Staff} from './staff';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  flag = false;
  pageSize = 10;
  pageNum = 1;
  data = {
    list: [],
    total: 0
  };
  search = '';
  private url = {
    listByPage: 'http://localhost:8001/staff/listByPage',
    create: 'http://localhost:8001/staff/create',
    deleteById: 'http://localhost:8001/staff/deleteById',
    getById: 'http://localhost:8001/staff/getById',
    update: 'http://localhost:8001/staff/update',
  };

  getListByPage(name: string): Observable<any> {
    const params = {
      page: this.pageNum,
      limit: this.pageSize,
    };
    if (this.flag) {
      return of(this.data);
    } else {
      return this.help.post(`${this.url.listByPage}`, params).pipe(
        map(res => {
          this.flag = true;
          this.data = {
            list: res.rows,
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

  getStaff(id: string) {
    return of(this.data.list).pipe(
      map((dataList: Staff[]) => dataList.find(data => data.id === id))
    );
  }

  constructor(private help: Help, private http: HttpClient) {
  }
}
