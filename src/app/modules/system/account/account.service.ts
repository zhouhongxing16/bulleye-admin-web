import {Injectable} from '@angular/core';
import {BaseService} from '../../../utils/base.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseService<Account> {

  url = {
    listByPage: '/account/listByPage',
    create: '/account/create',
    deleteById: '/account/delete',
    getById: '/account/getById',
    update: '/account/update',
    view: '',
    edit: '',
    add: '',
  };
}
