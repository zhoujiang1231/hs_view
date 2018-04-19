import { Component, OnInit } from '@angular/core'
import {MatDialog} from '@angular/material'
import {SysNewGroupDialogComponent} from './new-sys-groups.dialog'
import {SysTimeGroupService} from './sys-realtime-groups.service'
import appAlert from '../../utils/alert'

@Component({
  selector: 'app-real-time-lists',
  templateUrl: 'real-time-lists.component.html',
  styleUrls: ['real-time-list.component.less']
})
export class RealTimeListsComponent implements OnInit {
  sysTimeGroupData: any[] = []
  params: any = {pageSize: 20, currentPageNo: 1} /**请求后端数据的参数**/
  totalCount = 0 /*总数据条数，设置默认是0*/
  loadingIndicator = true
  isPermission// 是否有权限
  isSpinner = 1// 加载进度

  constructor(public _dialog: MatDialog,
              private sysTimeGroupService: SysTimeGroupService) {
    this.sysTimeGroupData = this.sysTimeGroupService.sysTimeGroupData
  }

  ngOnInit() {
    this.reloadSysTimeGroupCount()
  }

  /**加载 实时统计组 数据**/
  reloadSysTimeGroupCount () {
    this.sysTimeGroupService.reloadSysTimeGroup(this.params)
      .subscribe(page => {
        this.totalCount = page.data.totalCount
        if (page.data.status === 0) {
          this.isSpinner = 0
          if (page.data.permission === -1) {
            this.isPermission = 0
          } else if (page.data.permission === 0) {
            this.sysTimeGroupData = [...page.data.result]
            this.loadingIndicator = false
            this.isPermission = 1
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
    const config = SysNewGroupDialogComponent.config
    let dialogRef = this._dialog.open(SysNewGroupDialogComponent, config)
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result !== 'cancel') {
        this.reloadSysTimeGroupCount()
      }
      config.data = {}
      dialogRef = null
    })
  }

  /**修改每页展示的数据条数pageSize**/
  getLimit(event) {
    Object.assign(this.params, {currentPageNo: 1 , pageSize: event})
    this.reloadSysTimeGroupCount()
  }

  /**点击操作按钮：编辑0、删除1**/
  operateButton(value, row, rowIndex) {
    if (value === 0) {// 编辑
      const temRow = Object.assign({}, row)
      const config = SysNewGroupDialogComponent.config
      config.data = temRow
      let dialogRef = this._dialog.open(SysNewGroupDialogComponent, config)
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result && result !== 'cancel') {
          this.reloadSysTimeGroupCount()
        }
        config.data = {}
        dialogRef = null
      })
    } else {// 删除
      appAlert.common.remove('数据', () => {
        this.sysTimeGroupService.deleteSysTimeGroup(row.id)
          .subscribe(page => {
            if (page.data.status === 0) {
              appAlert.common.actionSuccess('删除实时统计组')
              this.reloadSysTimeGroupCount()
            }
          })
      })
    }
  }
}
