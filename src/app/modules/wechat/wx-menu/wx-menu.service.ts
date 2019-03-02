import { Injectable } from '@angular/core';
import {Help} from '../../../utils/Help';

@Injectable({
  providedIn: 'root'
})
export class WxMenuService {

  constructor(private help: Help) { }
}
