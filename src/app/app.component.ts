import {Component} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd';
import {Help} from './utils/Help';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [NzModalService]
})
export class AppComponent {
  title = 'bulleye-admin-web';
  constructor(public help: Help) {

  }

}
