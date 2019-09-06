import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-codemirror',
  templateUrl: './codemirror.component.html',
  styleUrls: ['./codemirror.component.scss']
})
export class CodemirrorComponent implements OnInit {
  code: any = '';
  cmOptions: any = '';

  constructor() {

  }

  ngOnInit() {
  }

}
