import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {Help} from '../../../utils/Help';
import {Menu} from './menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {


  flag = false;
  pageSize = 10;
  data = {
    rows: [],
    total: 0
  };
  private url = {
    listByPage: '/menu/listByPage',
    getAllMenus: '/menu/getAllMenus',
    getOrganizationMenus: '/menu/getOrganizationMenus',
    create: '/menu/create',
    deleteById: '/menu/delete',
    getById: '/menu/getById',
    update: '/menu/update',
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

  getAllMenus() {
    return this.help.post(this.url.getAllMenus, null);
  }

  getOrganizationMenus(params) {
    return this.help.post(this.url.getOrganizationMenus, params);
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
      map((dataList: Menu[]) => dataList.find(data => data.id === id))
    );
  }
}
