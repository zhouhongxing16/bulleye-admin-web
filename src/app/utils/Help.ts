import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NzMessageService} from 'ng-zorro-antd';
import {Location} from '@angular/common';
import {DatePipe} from '@angular/common';

@Injectable()
export class Help {
  private loadId: any;
  public isCollapsed = false;

  constructor(private http: HttpClient, private message: NzMessageService, private location: Location, private datePipe: DatePipe) {
  }

  back() {
    this.location.back();
  }

  go(url: string) {
    this.location.go(url);
  }

  showMessage(type: string, msg: string) {
    this.message.create(type, msg);
  }

  loading(msg: string = '加载中...') {
    this.loadId = this.message.loading(msg, {nzDuration: 0}).messageId;
  }

  stopLoad() {
    this.message.remove(this.loadId);
  }

  get(url: string): Observable<any> {
    return this.http.get(url);
  }


  post(url: string, params: any): Observable<any> {
    return this.http.post(url, params);
  }

  formatDate(date, format) {
    return this.datePipe.transform(date, format);
  }

  isEmpty(val): boolean {
    if (val !== undefined && val != null && (val + '').trim() !== '') {
      return false;
    } else {
      return true;
    }
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
