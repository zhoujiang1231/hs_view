import { Component, OnInit } from '@angular/core'
import {MatDialog} from '@angular/material'
import {SysNewAclDialogComponent} from './new-acl.dialog'
import {SysAclService} from './sys-acl.service'
import appAlert from '../../utils/alert'
import {SysPlatformService} from '../platform/sys-platform.service'
import {BusinessListService} from '../../business/business-list.service'

@Component({
  selector: 'app-system-acl',
  templateUrl: 'system-acl.component.html',
  styleUrls: ['system-acl.component.less']
})

export class SystemAclComponent implements OnInit {
  sysAclData: any[] = []
  params: any = {pageSize: 20, currentPageNo: 1} /**请求后端数据的参数**/
  totalCount = 0 /*总数据条数，设置默认是0*/
  loadingIndicator = true
  isPermission// 是否有权限
  isSpinner = 1// 加载进度

  constructor(public _dialog: MatDialog,
              private sysAclService: SysAclService,
              private sysPlatformService: SysPlatformService,
              private businessListService: BusinessListService) {
    this.sysAclData = this.sysAclService.sysAclData
  }

  ngOnInit() {
    this.reloadSysAclCount()
  }

  /**加载 acl列表数据**/
  reloadSysAclCount() {
    this.sysAclService.reloadSysAcl(this.params)
      .subscribe(page => {
        this.totalCount = page.data.totalCount
        if (page.data.status === 0) {
          this.isSpinner = 0
          if (page.data.permission === 0) {
            this.isPermission = 1
            this.sysAclData = [...page.data.result]
            this.loadingIndicator = false
          } else if (page.data.permission === -1) {
            this.isPermission = 0
          }
        }
      })
  }

  /**点击 顶部右侧"新建"按钮**/
  onClickBtnWithAction(event) {
    if (event === 'add') {
      this.newDialog()
    }
  }

  /**打开 新建dialog**/
  newDialog() {
    // 请求domainId列表
    this.sysPlatformService.reloadSysPlatform({pageSize: 100})
    this.businessListService.reloadBusinessList({pageSize: 100})
    const config = SysNewAclDialogComponent.config
    config.data = {domainIdArr: this.sysPlatformService.sysPlatformData, serviceIdArr: this.businessListService.businessList}
    // 打开模态框
    let dialogRef = this._dialog.open(SysNewAclDialogComponent, config)
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result !== 'cancel') {
        this.reloadSysAclCount()
      }
      config.data = {}
      dialogRef = null
    })
  }

  /**修改每页展示的数据条数pageSize**/
  getLimit(event) {
    Object.assign(this.params, {currentPageNo: 1 , pageSize: event})
    this.reloadSysAclCount()
  }

  /**点击操作按钮：删除**/
  operateButton(row, rowIndex) {
    appAlert.common.remove('数据', () => {
      this.sysAclService.deleteSysAcl(row.id)
        .subscribe(page => {
          if (page.data.status === 0) {
            appAlert.common.actionSuccess('删除白名单')
            this.reloadSysAclCount()
          }
        })
      // this.sysAclData.splice(rowIndex, 1)
      // this.totalCount -= 1
    })
  }
}
