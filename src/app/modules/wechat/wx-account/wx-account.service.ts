import { Injectable } from '@angular/core';
import {Help} from '../../../utils/Help';

@Injectable({
  providedIn: 'root'
})
export class WxAccountService {

  constructor(private help: Help) { }
}
