import {Injectable} from '@angular/core';
import {Help} from '../../../utils/Help';
import {Observable, of, Subscribable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Organization} from './organization';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  flag = false;
  pageSize = 10;
  pageNum = 1;
  data = {
    rows: [],
    total: 0
  };
  private url = {
    listByPage: '/organization/listByPage',
    create: '/organization/create',
    deleteById: '/organization/delete',
    getById: '/organization/getById',
    update: '/organization/update',
    createOrganizationMenu: '/organizationmenu/createOrganizationMenu',
    getCheckedLeafMenus: '/organizationmenu/getListByParams',
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
      map((dataList: Organization[]) => dataList.find(data => data.id === id))
    );
  }

  saveOrganizationMenus(data: any) {
    return this.help.post(this.url.createOrganizationMenu, data);
  }

  getCheckedLeafMenus(data: any) {
    return this.help.post(this.url.getCheckedLeafMenus, data);
  }
}
