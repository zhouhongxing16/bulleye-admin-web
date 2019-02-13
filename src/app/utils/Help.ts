import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class Help {

  constructor(private http: HttpClient) {
  }

  get(url: string): Observable<any> {
    return this.http.get(url);
  }


  post(url: string, params: any): Observable<any> {
    return this.http.post(url, params);
  }

  convertTime(timestamp: any) {
    const time: any = new Date(timestamp);
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const date = time.getDate();
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();
    return year + '-' + month + '-' + date + '   ' + hour + ':' + minute + ':' + second;
  }
}
