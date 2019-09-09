import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as CodeMirror from 'codemirror';
import 'codemirror/mode/sql/sql';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/sql-hint.js';

@Component({
  selector: 'app-codemirror',
  templateUrl: './codemirror.component.html',
  styleUrls: ['./codemirror.component.scss']
})
export class CodemirrorComponent implements OnInit {

  @Input() code;
  @Output() public codeChange = new EventEmitter();
  cmOptions: any = {
    // 显示行号
    lineNumbers: true,
    styleActiveLine: true, // 当前行背景高亮
    mode: {name: 'text/x-mysql'}, // 定义mode
    theme: 'ambiance', // 设置黑色主题
    extraKeys: {
      'Ctrl': 'autocomplete', // 提示快捷键
      Tab: function (cm) {
        const spaces = Array(cm.getOption('indentUnit') + 1).join(' ');
        cm.replaceSelection(spaces);
      }
    },   // 自动提示配置
  };

  constructor() {

  }
  /**
   * change
   */
  public change() {
    this.codeChange.emit(this.code);
  }

  ngOnInit() {
  }

}
