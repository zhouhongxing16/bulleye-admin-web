import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Help} from '../../utils/Help';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private url = {
    listByPage: 'http://localhost:8001/staff/listByPage',
    create: 'http://localhost:8001/staff/create',
    deleteById: 'http://localhost:8001/staff/deleteById',
    getById: 'http://localhost:8001/staff/getById',
    update: 'http://localhost:8001/staff/update',
  };


  getList(pageIndex: number = 1, pageSize: number = 10, sortField: string, sortOrder: string, genders: string[]): Observable<{}> {
    let params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('limit', `${pageSize}`)
      .append('sortField', sortField)
      .append('sortOrder', sortOrder);
    genders.forEach(gender => {
      params = params.append('gender', gender);
    });
    return this.http.get(`${this.url.listByPage}`, {
      params
    });
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

  constructor(private help: Help, private http: HttpClient) {
  }
}
