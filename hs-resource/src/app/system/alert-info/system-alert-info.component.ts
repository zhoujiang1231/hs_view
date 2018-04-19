import { Component, OnInit } from '@angular/core'
import {SysAlertDialogComponent} from './sys-alert-info.dialog'
import {MatDialog} from '@angular/material'
import {SysAlertService} from './sys-alert.service'
import appAlert from '../../utils/alert'

@Component({
  selector: 'app-system-alert-info',
  templateUrl: 'system-alert-info.component.html',
  styleUrls: ['system-alert-info.component.less']
})
export class SystemAlertInfoComponent implements OnInit {
  sysAlertData: any[] = []
  params: any = {pageSize: 20, currentPageNo: 1} /**请求后端数据的参数**/
  totalCount = 0 /*总数据条数，设置默认是0*/
  levels = []
  types = []
  loadingIndicator = true
  isPermission// 是否有权限
  isSpinner = 1// 加载进度

  constructor(public _dialog: MatDialog,
              private sysAlertService: SysAlertService) {
    this.sysAlertData = this.sysAlertService.sysAlertData
  }

  ngOnInit() {
    this.reloadSysAlertCount()
    this.levels = ['警告', '错误']// 1警告，2错误
    this.types = ['系统', '业务', '自定义']// 1系统，2业务，3自定义
  }

  /**格式化数据："级别、类型、周期"解析**/
  formatData(rows) {
    rows.forEach(item => {
      item.levelName = this.levels[item.level - 1]
      item.typeName = this.types[item.type - 1]
      item.intervalName = item.interval + '分钟'
    })
  }

  /**加载 sys告警信息 数据**/
  reloadSysAlertCount () {
    this.sysAlertService.reloadSysAlert(this.params)
      .subscribe(page => {
        this.totalCount = page.data.totalCount
        if (page.data.status === 0) {
          this.isSpinner = 0
          if (page.data.permission === 0) {
            this.isPermission = 1
            this.sysAlertData = [...page.data.result]
            this.formatData(this.sysAlertData)
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
    const config = SysAlertDialogComponent.config
    let dialogRef = this._dialog.open(SysAlertDialogComponent, config)
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result !== 'cancel') {
        this.reloadSysAlertCount()
      }
      config.data = {}
      dialogRef = null
    })
  }

  /**修改每页展示的数据条数pageSize**/
  getLimit(event) {
    Object.assign(this.params, {currentPageNo: 1 , pageSize: event})
    this.reloadSysAlertCount()
  }

  /**点击操作按钮：编辑0、删除1**/
  operateButton(value, row, rowIndex) {
    if (value === 0) {// 编辑
      const temRow = Object.assign({}, row)
      const config = SysAlertDialogComponent.config
      config.data = temRow
      let dialogRef = this._dialog.open(SysAlertDialogComponent, config)
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result && result !== 'cancel') {
          this.reloadSysAlertCount()
        }
        config.data = {}
        dialogRef = null
      })
    } else {// 删除
      appAlert.common.remove('数据', () => {
        this.sysAlertService.deleteSysAlert(row.id)
          .subscribe(page => {
            if (page.data.status === 0) {
              appAlert.common.actionSuccess('删除告警设置')
              this.reloadSysAlertCount()
            }
          })
      })
    }
  }
}
