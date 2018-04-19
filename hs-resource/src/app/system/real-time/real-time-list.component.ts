import { Component, OnInit } from '@angular/core'
import {MatDialog} from '@angular/material'
import {SysNewStatisticDialogComponent} from './new-statistics.dialog'
import {SysTimeListService} from './sys-realtime-list.service'
import appAlert from '../../utils/alert'
import {SysTimeGroupService} from './sys-realtime-groups.service'

@Component({
  selector: 'app-real-time-list',
  templateUrl: 'real-time-list.component.html',
  styleUrls: ['real-time-list.component.less']
})

export class RealTimeListComponent implements OnInit {
  sysTimeListData: any[] = []
  params: any = {pageSize: 20 , currentPageNo: 1} /**请求后端数据的参数**/
  totalCount = 0 /*总数据条数，设置默认是0*/
  sysTimeGroupData
  eventTypes
  increaseTypes
  loadingIndicator = true
  isPermission// 是否有权限
  isSpinner// 加载进度

  constructor(public _dialog: MatDialog,
              private sysTimeListService: SysTimeListService,
              private sysTimeGroupService: SysTimeGroupService) {
    this.sysTimeListData = this.sysTimeListService.sysTimeListData
    this.sysTimeGroupData = this.sysTimeGroupService.sysTimeGroupData
  }

  ngOnInit() {
    this.sysTimeGroupService.reloadSysTimeGroup({pageSize: 100})
    this.eventTypes = ['invite', 'routed', 'fail route', 'response ring', 'response fail', 'answer', 'bye']
    this.increaseTypes = ['数值', '变量']
  }

  /**格式化数据：事件类型、**/
  formatData(rows) {
    rows.forEach(item => {
      item.eventTypeName = this.eventTypes[item.eventType - 1]
      item.increaseTypeName = this.increaseTypes[item.increaseType - 1]
    })
  }

  /**加载 实时统计管理 数据**/
  reloadSysTimeListCount () {
    this.isSpinner = 1
    this.loadingIndicator = true
    this.sysTimeListService.reloadSysTimeList(this.params)
      .subscribe(page => {
        this.totalCount = page.data.totalCount
        this.isSpinner = 0
        if (page.data.status === 0) {
          if (page.data.permission === 0) {
            this.isPermission = 1
            this.loadingIndicator = false
            this.sysTimeListData = [...page.data.result]
            this.formatData(this.sysTimeListData)
          } else  if (page.data.permission === -1) {
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
    const config = SysNewStatisticDialogComponent.config
    config.data = {sysTimeGroupDataArr: this.sysTimeGroupData}
    let dialogRef = this._dialog.open(SysNewStatisticDialogComponent, config)
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result !== 'cancel') {
        this.reloadSysTimeListCount()
      } else {
      }
      config.data = {}
      dialogRef = null
    })
  }

  /**修改每页展示的数据条数pageSize**/
  getLimit(event) {
    Object.assign(this.params, {currentPageNo: 1 , pageSize: event})
    this.reloadSysTimeListCount()
  }

  /**点击 搜索按钮**/
  search() {// statisticGroupId转化为int
    if (this.params.statisticGroupId) {
      this.params.statisticGroupId = parseInt(this.params.statisticGroupId, 10)
    }
    this.reloadSysTimeListCount()
  }

  /**点击操作按钮：编辑0，删除1**/
  operateButton(value, row, rowIndex) {
    if (value === 0) {// 编辑
      const temRow = Object.assign({}, row, {sysTimeGroupDataArr: this.sysTimeGroupData})
      const config = SysNewStatisticDialogComponent.config
      config.data = temRow
      let dialogRef = this._dialog.open(SysNewStatisticDialogComponent, config)
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result && result !== 'cancel') {
          this.reloadSysTimeListCount()
        }
        config.data = {}
        dialogRef = null
      })
    } else {// 删除
      appAlert.common.remove('数据', () => {
        this.sysTimeListService.deleteSysTimeList(row.id)
          .subscribe(page => {
            if (page.data.status === 0) {
              appAlert.common.actionSuccess('删除实时统计')
              this.reloadSysTimeListCount()
            }
          })
      })
    }
  }
}
