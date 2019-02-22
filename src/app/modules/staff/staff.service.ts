import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Help} from '../../utils/Help';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  listByPage = 'http://localhost:8001/staff/listByPage';

  getList(pageIndex: number = 1, pageSize: number = 10, sortField: string, sortOrder: string, genders: string[]): Observable<{}> {
    let params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('limit', `${pageSize}`)
      .append('sortField', sortField)
      .append('sortOrder', sortOrder);
    genders.forEach(gender => {
      params = params.append('gender', gender);
    });
    return this.http.get(`${this.listByPage}`, {
      params
    });
  }

  deleteById(id: string) {
    return this.help.post(`http://localhost:8001/staff/delete/` + id, null);
  }

  constructor(private help: Help, private http: HttpClient) {
  }
}
