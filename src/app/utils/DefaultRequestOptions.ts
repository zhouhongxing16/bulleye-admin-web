import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class DefaultRequestOptions extends HttpHeaders {

  constructor() {
    super();
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      this.append('Authorization', `Bearer ${token}`);
    }
  }
}
