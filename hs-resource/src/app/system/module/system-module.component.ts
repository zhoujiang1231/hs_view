import { Component, OnInit } from '@angular/core'
import {MatDialog} from '@angular/material'
import {SysModuleService} from './sys-module.service'

@Component({
  selector: 'app-system-module',
  templateUrl: 'system-module.component.html',
  styleUrls: ['system-module.component.less']
})
export class SystemModuleComponent implements OnInit {
  sysModuleData: any[] = []
  params: any = {pageSize: 20, currentPageNo: 1} /**请求后端数据的参数**/
  totalCount = 0 /*总数据条数，设置默认是0*/
  loadingIndicator = true
  isPermission// 是否有权限
  isSpinner = 1// 加载进度

  constructor(public _dialog: MatDialog,
              private sysModuleService: SysModuleService) {
    this.sysModuleData = this.sysModuleService.sysModuleData
  }

  ngOnInit() {
    this.reloadSysModuleCount()
  }

  /**修改每页展示的数据条数pageSize**/
  getLimit(event) {
    Object.assign(this.params, {currentPageNo: 1 , pageSize: event})
    this.reloadSysModuleCount()
  }

  /**加载 模块管理列表数据**/
  reloadSysModuleCount() {
    this.sysModuleService.reloadSysModule(this.params)
      .subscribe(page => {
        this.totalCount = page.data.totalCount
        if (page.data.status === 0) {
          this.isSpinner = 0
          if (page.data.permission === 0) {
            this.isPermission = 1
            this.sysModuleData = [...page.data.result]
            this.loadingIndicator = false
          } else if (page.data.permission === -1) {
            this.isPermission = 0
          }
        }
      })
  }
}
