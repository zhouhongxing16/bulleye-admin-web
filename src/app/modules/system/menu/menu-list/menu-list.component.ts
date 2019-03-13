import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Help} from '../../../../utils/Help';
import {MenuService} from '../menu.service';
import {NzDropdownContextComponent, NzDropdownService, NzFormatEmitEvent, NzTreeComponent, NzTreeNode} from 'ng-zorro-antd';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {

  @ViewChild('treeCom') treeCom: NzTreeComponent;
  dropdown: NzDropdownContextComponent;
  // actived node
  activedNode: NzTreeNode;
  rightNode: NzTreeNode;
  nodes = [{
    title: '系统',
    key: '100',
    author: 'NG ZORRO',
    expanded: true,
    children: [
      {title: 'leaf 0-0', key: '1000', author: 'NG ZORRO', isLeaf: true},
      {title: 'leaf 0-1', key: '1001', author: 'NG ZORRO', isLeaf: true}
    ]
  }, {
    title: 'parent 1',
    key: '101',
    author: 'NG ZORRO',
    children: [
      {title: 'leaf 1-0', key: '1010', author: 'NG ZORRO', isLeaf: true},
      {title: 'leaf 1-1', key: '1011', author: 'NG ZORRO', isLeaf: true}
    ]
  }];

  // 构造函数里注入右键菜单的服务
  constructor(private menuService: MenuService, private help: Help, private nzDropdownService: NzDropdownService) {
  }

  ngOnInit() {
  }

  openFolder(data: NzTreeNode | NzFormatEmitEvent): void {
    // do something if u want
    if (data instanceof NzTreeNode) {
      data.isExpanded = !data.isExpanded;
    } else {
      data.node.isExpanded = !data.node.isExpanded;
    }
  }

  getAllMenus() {
    this.menuService.getAllMenus().subscribe(msg => {
      if (msg.success) {
        this.nodes = msg.data;
      }
    });
  }

  activeNode(data: NzFormatEmitEvent): void {
    this.activedNode = data.node;
  }

  // 创建右键菜单和关闭右键菜单的代码
  contextMenu($event: MouseEvent, template: TemplateRef<void>, node: NzTreeNode): void {
    this.rightNode = node;
    this.dropdown = this.nzDropdownService.create($event, template);
  }


  editUnit(): void {
    console.log(this.rightNode);
    this.dropdown.close();
    // do something
  }
}
