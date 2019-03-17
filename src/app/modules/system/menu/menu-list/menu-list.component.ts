import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Help} from '../../../../utils/Help';
import {MenuService} from '../menu.service';
import {NzDropdownContextComponent, NzDropdownService, NzFormatEmitEvent, NzTreeComponent, NzTreeNode} from 'ng-zorro-antd';
import {Menu} from '../menu';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

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
  nodes = [];
  visible = false;
  obj: Menu = new Menu();
  isLoading = false;
  validateForm: FormGroup;
  expandKeys = [];

  // 构造函数里注入右键菜单的服务
  constructor(
    private formBuilder: FormBuilder,
    private menuService: MenuService,
    private help: Help,
    private nzDropdownService: NzDropdownService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.getAllMenus();
    this.validateForm = this.formBuilder.group({
      icon: [null, [Validators.required]],
      title: [null, [Validators.required]],
      path: [null, [Validators.required]],
      code: [null, [Validators.required]],
      sort: [null, [Validators.required]],
      status: [null, [Validators.required]],
      parentId: [null],
    });
  }

  createMenu(): void {
    this.obj = new Menu();
    this.obj.parentId = this.rightNode.origin.id;
    this.expandKeys.push(this.rightNode.origin.id);
    this.visible = true;
    this.dropdown.close();
  }

  editMenu(): void {
    this.obj = this.rightNode.origin;
    this.visible = true;
    this.dropdown.close();
  }

  addAuth() {
    console.log(this.rightNode.origin);
    this.router.navigate(['/menuauth/list', this.rightNode.origin.id]);
  }

  close(): void {
    this.visible = false;
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

  deleteObject() {
    console.log(this.rightNode);
    if (this.rightNode.children.length > 0) {
      this.help.showMessage('warning', '请先删除子节点！');
    } else {
      this.menuService.deleteById(this.rightNode.origin.id).subscribe(msg => {
        if (msg.success) {
          this.getAllMenus();
          this.help.showMessage('success', msg.message);
        } else {
          this.help.showMessage('error', msg.message);
        }
      });
    }

  }

  activeNode(data: NzFormatEmitEvent): void {
    this.activedNode = data.node;
  }

  onChange($event: string): void {
    console.log($event);
  }

  // 创建右键菜单和关闭右键菜单的代码
  contextMenu($event: MouseEvent, template: TemplateRef<void>, node: NzTreeNode): void {
    this.expandKeys = [];
    this.rightNode = node;
    this.expandKeys.push(node.origin.key);
    this.dropdown = this.nzDropdownService.create($event, template);
  }

  submitForm() {
    this.isLoading = true;
    this.menuService.saveOrUpdateData(this.obj).subscribe(res => {
      this.isLoading = false;
      if (res.success) {
        this.help.showMessage('success', res.message);
        this.visible = false;
        this.getAllMenus();
      }
    });
  }
}
