import {Component, OnInit, ViewChild} from '@angular/core';
import {Help} from '../../../../utils/Help';
import {RoleService} from '../role.service';
import {Role} from '../role';
import {NzFormatEmitEvent, NzTreeComponent} from 'ng-zorro-antd';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {

  @ViewChild('roleMenuAuthTree') roleMenuAuthTree: NzTreeComponent;
  rows: Role[] = [];
  total = 0;
  pageIndex = 1;
  pageSize = 10;
  isLoading = false;
  visible = false;
  roleId: string;
  nodes = [];
  selectMenus = [];
  defaultCheckedKeys = [];
  defaultSelectedKeys = [];

  constructor(private roleService: RoleService, private help: Help) {
  }

  ngOnInit() {
    this.getListByPage();
  }


  getListByPage(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
    this.isLoading = true;
    this.roleService.getListByPage(this.pageIndex, this.pageSize, {}).subscribe(data => {
      this.isLoading = false;
      this.rows = data.rows;
      this.total = data.total;
    }, err => {
      this.isLoading = false;
      this.help.showMessage('error', `请求出现错误: ${JSON.stringify(err)}`);
    });
  }

  deleteRow(id: string) {
    this.help.loading('删除中...');
    this.roleService.deleteById(id).subscribe(res => {
      if (res.success) {
        this.help.stopLoad();
        this.help.showMessage('success', res.message);
        this.getListByPage(true);
      } else {
        this.help.showMessage('error', res.message);
      }
    });
  }

  saveRoleMenus() {
    this.isLoading = true;
    this.roleService.saveRoleMenus(this.selectMenus).subscribe(res => {
      this.isLoading = false;
      if (res.success) {
        this.help.showMessage('success', res.message);
        this.close();
      }
    });
  }

  addMenu(roleId: string): void {
    this.visible = true;
    this.roleService.saveRoleMenus({roleId: roleId}).subscribe(msg => {
      if (msg.success) {
        this.roleId = roleId;
        this.getCheckedLeafMenus(roleId);
        this.nodes = msg.data;
      }
    });
  }

  getSelectedNodeList() {
    this.selectMenus = [];
    const selectNodes = this.roleMenuAuthTree.getCheckedNodeList();
    this.getChildLeafNode(selectNodes);
    this.getHalfCheckedNodeList();
  }

  getHalfCheckedNodeList() {
    const halfCheckedNodeList = this.roleMenuAuthTree.getHalfCheckedNodeList();
    console.log(halfCheckedNodeList);
    halfCheckedNodeList.forEach(node => {
      this.selectMenus.push({
        roleId: this.roleId,
        menuId: node.origin.id
      });
    });
    this.saveRoleMenus();
  }

  // 递归获取叶子节点
  getChildLeafNode(nodes: any) {
    nodes.forEach(node => {
      this.selectMenus.push({
        roleId: this.roleId,
        menuId: node.origin.id
      });
      if (!node.isLeaf && node.children.length > 0) {
        this.getChildLeafNode(node.children);
      }
    });
  }

  close(): void {
    this.visible = false;
  }

  getCheckedLeafMenus(roleId: string): void {
    const that = this;
    this.roleService.getCheckedLeafMenus({roleId: roleId, isLeaf: true}).subscribe(res => {
      if (res.success) {
        that.defaultCheckedKeys = [];
        res.data.forEach(function (value) {
          that.defaultCheckedKeys.push(value.menuId);
        });
        console.log(this.defaultCheckedKeys);
      }
    });
  }

  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }

}
