import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Help} from '../../../utils/Help';
import {map} from 'rxjs/operators';
import {Staff} from './staff';
import {BaseService} from '../../../utils/base.service';

@Injectable({
  providedIn: 'root'
})
export class StaffService extends BaseService<Staff> {

  url = {
    listByPage: '/staff/listByPage',
    create: '/staff/create',
    deleteById: '/staff/delete',
    getById: '/staff/getById',
    update: '/staff/update',
    view: '',
    edit: '',
    add: '',
  };
}
