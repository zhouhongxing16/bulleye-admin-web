import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NzMessageService} from 'ng-zorro-antd';

@Injectable()
export class Help {
  private loadId: any;

  constructor(private http: HttpClient, private message: NzMessageService) {
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
