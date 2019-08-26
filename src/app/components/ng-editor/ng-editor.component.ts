import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn.js';

@Component({
  selector: 'app-ng-editor',
  templateUrl: './ng-editor.component.html',
  styleUrls: ['./ng-editor.component.scss']
})
export class NgEditorComponent implements OnInit {

  @Input() content;
  public Editor = ClassicEditor;

  @Output() public contentChange = new EventEmitter();

  // 配置语言
  public config = {
    language: 'zh-cn',
  };

  constructor() {
  }

  ngOnInit() {
  }

  /**
   * change
   */
  public change() {
    this.contentChange.emit(this.content);
  }

}
