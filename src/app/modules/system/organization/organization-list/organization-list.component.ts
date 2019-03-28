import {Component, OnInit, ViewChild} from '@angular/core';
import {Help} from '../../../../utils/Help';
import {Organization} from '../organization';
import {OrganizationService} from '../organization.service';
import {NzDropdownContextComponent, NzDropdownService, NzFormatEmitEvent, NzTreeComponent} from 'ng-zorro-antd';
import {MenuService} from '../../menu/menu.service';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent implements OnInit {
  @ViewChild('menuAuthTree') menuAuthTree: NzTreeComponent;
  rows: Organization[] = [];
  total = 0;
  pageIndex = 1;
  pageSize = 10;
  isLoading = false;
  visible = false;
  organizationId: string;
  nodes = [{
    'id': '12',
    'parentId': null,
    'icon': null,
    'code': null,
    'title': '一级菜单',
    'path': null,
    'status': 1,
    'sort': 1,
    'created': 20180865115616,
    'open': false,
    'value': '12',
    'key': '12',
    'children': [{
      'id': '13',
      'parentId': '12',
      'icon': null,
      'code': null,
      'title': '二级菜单',
      'path': null,
      'status': 1,
      'sort': 1,
      'created': 20180865115616,
      'open': false,
      'value': '13',
      'key': '13',
      'children': [{
        'id': '14',
        'parentId': '13',
        'icon': 'wechat',
        'code': '665869',
        'title': '三级菜单',
        'path': '111',
        'status': 1,
        'sort': 1,
        'created': 20180865115616,
        'open': false,
        'value': '14',
        'key': '14',
        'children': null
      }]
    }]
  }, {
    'id': '2',
    'parentId': null,
    'icon': null,
    'code': 'admin1',
    'title': '系统管理',
    'path': '/account/list',
    'status': 1,
    'sort': 1,
    'created': 20180731114527,
    'open': false,
    'value': '2',
    'key': '2',
    'children': [{
      'id': '3',
      'parentId': '2',
      'icon': null,
      'code': 'staff',
      'title': '角色管理',
      'path': '/role/list',
      'status': 1,
      'sort': 1,
      'created': 20180731114527,
      'open': false,
      'value': '3',
      'key': '3',
      'children': [{
        'id': '5',
        'parentId': '3',
        'icon': null,
        'code': '111',
        'title': '员工管理',
        'path': '/staff/list',
        'status': 1,
        'sort': 1,
        'created': 20180731171128,
        'open': false,
        'value': '5',
        'key': '5',
        'children': null
      }, {
        'id': '4',
        'parentId': '3',
        'icon': null,
        'code': 'admin2',
        'title': '账号管理',
        'path': '/account/list',
        'status': 1,
        'sort': 1,
        'created': 20180731114527,
        'open': false,
        'value': '4',
        'key': '4',
        'children': null
      }]
    }, {
      'id': '11',
      'parentId': '2',
      'icon': null,
      'code': '111',
      'title': '机构部门管理',
      'path': '/department/list',
      'status': 1,
      'sort': 1,
      'created': 20180731171128,
      'open': false,
      'value': '11',
      'key': '11',
      'children': null
    }, {
      'id': '10',
      'parentId': '2',
      'icon': null,
      'code': '111',
      'title': '组织机构管理',
      'path': '/organization/list',
      'status': 1,
      'sort': 1,
      'created': 20180731171128,
      'open': false,
      'value': '10',
      'key': '10',
      'children': null
    }, {
      'id': '17',
      'parentId': '2',
      'icon': null,
      'code': null,
      'title': '菜单管理',
      'path': '/menu/list',
      'status': 1,
      'sort': 1,
      'created': 20180865115616,
      'open': false,
      'value': '17',
      'key': '17',
      'children': null
    }, {
      'id': '52091a21-460a-11e9-bd13-382c5e4d3b2a',
      'parentId': '2',
      'icon': 'wechat',
      'code': '1',
      'title': '菜单权限管理',
      'path': '/menuauth/list',
      'status': 1,
      'sort': 111,
      'created': 1552534575142,
      'open': false,
      'value': '52091a21-460a-11e9-bd13-382c5e4d3b2a',
      'key': '52091a21-460a-11e9-bd13-382c5e4d3b2a',
      'children': null
    }]
  }, {
    'id': '1',
    'parentId': null,
    'icon': 'wechat',
    'code': 'admin',
    'title': '微信管理',
    'path': '/menu',
    'status': 1,
    'sort': 2,
    'created': 20180731114527,
    'open': false,
    'value': '1',
    'key': '1',
    'children': [{
      'id': '6',
      'parentId': '1',
      'icon': 'wechat',
      'code': '111',
      'title': '微信菜单管理',
      'path': '/wxmenu/list',
      'status': 1,
      'sort': 1,
      'created': 20180731171128,
      'open': false,
      'value': '6',
      'key': '6',
      'children': null
    }, {
      'id': '7',
      'parentId': '1',
      'icon': 'wechat',
      'code': '111',
      'title': '微信公众号管理',
      'path': '/wxaccount/list',
      'status': 1,
      'sort': 1,
      'created': 20180731171128,
      'open': false,
      'value': '7',
      'key': '7',
      'children': null
    }, {
      'id': '8',
      'parentId': '1',
      'icon': null,
      'code': '111',
      'title': '微信会员管理',
      'path': '/wxmember/list',
      'status': 1,
      'sort': 1,
      'created': 20180731171128,
      'open': false,
      'value': '8',
      'key': '8',
      'children': null
    }]
  }];
  selectMenus = [];
  defaultCheckedKeys = ['5', '7'];
  defaultSelectedKeys = [];

  constructor(
    private organizationService: OrganizationService,
    private menuService: MenuService,
    private help: Help,
    private nzDropdownService: NzDropdownService
  ) {
  }

  ngOnInit() {
    this.getListByPage();
  }

  addMenu(organizationId: string): void {
    this.visible = true;
    this.menuService.getOrganizationMenus({organizationId: organizationId}).subscribe(msg => {
      if (msg.success) {
        this.organizationId = organizationId;
        this.getCheckedLeafMenus(organizationId);
        this.nodes = msg.data;
      }
    });
  }

  getSelectedNodeList() {
    this.selectMenus = [];
    const selectNodes = this.menuAuthTree.getCheckedNodeList();
    this.getChildLeafNode(selectNodes);
    this.getHalfCheckedNodeList();
  }

  getHalfCheckedNodeList() {
    const halfCheckedNodeList = this.menuAuthTree.getHalfCheckedNodeList();
    console.log(halfCheckedNodeList);
    halfCheckedNodeList.forEach(node => {
      this.selectMenus.push({
        organizationId: this.organizationId,
        menuId: node.origin.id,
        displayName: node.origin.title,
        status: 1,
        leaf: node.isLeaf
      });
    });
    console.log(this.selectMenus);
    this.saveOrganizationMenus();
  }

  saveOrganizationMenus() {
    this.isLoading = true;
    this.organizationService.saveOrganizationMenus(this.selectMenus).subscribe(res => {
      this.isLoading = false;
      if (res.success) {
        this.help.showMessage('success', res.message);
        this.close();
      }
    });
  }

  // 递归获取叶子节点
  getChildLeafNode(nodes: any) {
    nodes.forEach(node => {
      this.selectMenus.push({
        organizationId: this.organizationId,
        menuId: node.origin.id,
        displayName: node.origin.title,
        status: 1,
        leaf: node.isLeaf
      });
      if (!node.isLeaf && node.children.length > 0) {
        this.getChildLeafNode(node.children);
      }
    });
  }

  close(): void {
    this.visible = false;
  }

  getCheckedLeafMenus(organizationId: string): void {
    const that = this;
    this.organizationService.getCheckedLeafMenus({organizationId: organizationId, isLeaf: true}).subscribe(res => {
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


  getListByPage(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
    this.isLoading = true;
    this.organizationService.getListByPage(this.pageIndex, this.pageSize).subscribe(data => {
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
    this.organizationService.deleteById(id).subscribe(res => {
      if (res.success) {
        this.help.stopLoad();
        this.help.showMessage('success', res.message);
        this.getListByPage(true);
      } else {
        this.help.showMessage('error', res.message);
      }
    });
  }

}
