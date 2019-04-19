import {Component, Input, OnInit} from '@angular/core';
import {Help} from '../../utils/Help';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() menus: any;

  constructor(public help: Help) {
  }

  ngOnInit() {
  }

}
