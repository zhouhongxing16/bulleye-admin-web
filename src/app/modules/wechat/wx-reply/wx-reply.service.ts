import { Injectable } from '@angular/core';
import {Help} from '../../../utils/Help';

@Injectable({
  providedIn: 'root'
})
export class WxReplyService {

  constructor(private help: Help) { }
}
