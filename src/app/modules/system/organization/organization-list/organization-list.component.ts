import {Component, OnInit, ViewChild} from '@angular/core';
import {Help} from '../../../../utils/Help';
import {Organization} from '../organization';
import {OrganizationService} from '../organization.service';
import {NzDropdownContextComponent, NzDropdownService, NzFormatEmitEvent, NzTreeComponent} from 'ng-zorro-antd';
import {MenuService} from '../../menu/menu.service';
import {of} from 'rxjs';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent implements OnInit {
  @ViewChild('menuAuthTree') menuAuthTree: NzTreeComponent;
  dropdown: NzDropdownContextComponent;
  rows: Organization[] = [];
  total = 0;
  pageIndex = 1;
  pageSize = 10;
  isLoading = false;
  visible = false;
  organizationId: string;
  nodes = [];
  selectMenus = [];

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
    this.menuAuthTree.getHalfCheckedNodeList().forEach(node => {
      this.selectMenus.push({
        organizationId: this.organizationId,
        menuId: node.origin.id,
        displayName: node.origin.title,
        status: 1
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
        status: 1
      });
      if (!node.isLeaf && node.children.length > 0) {
        this.getChildLeafNode(node.children);
      }
    });
  }

  close(): void {
    this.visible = false;
  }

  nzEvent(event: NzFormatEmitEvent): void {
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
