import {Component, TemplateRef, ViewChild} from '@angular/core';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {Help} from './utils/Help';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [NzModalService]
})
export class AppComponent {
  title = 'bulleye-admin-web';
  userInfo: any;
  menus: any;
  triggerTemplate: TemplateRef<void> | null = null;
  constructor(public help: Help, private modalService: NzModalService, private message: NzMessageService) {

  }

  @ViewChild('trigger') customTrigger: TemplateRef<void>;
  /** custom trigger can be TemplateRef **/
  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }

}
