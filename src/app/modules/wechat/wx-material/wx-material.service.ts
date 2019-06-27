import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {WxMaterial} from "./wx-material";
import {BaseService} from '../../../utils/base.service';
import {WxAccount} from "../wx-account/wx-account";
@Injectable({
  providedIn: 'root'
})
export class WxMaterialService extends BaseService<WxMaterial>{
  url = {
    listByPage: '/wxmaterial/listByPage',
    create: '/wxmaterial/create',
    deleteById: '/wxmaterial/delete',
    getById: '/wxmaterial/getById',
    update: '/wxmaterial/update',
    select: '/wxmaterial/select',
    view: '',
    edit: '',
    add: '',
  };

  select(wxMaterial: WxMaterial): Observable<any> {
    return this.help.post(`${this.url.select}`, wxMaterial).pipe(
      map(res => {
        this.data = {
          rows: res.list,
          total: res.list.length
        };
        return this.data;
      }));
  }
}
