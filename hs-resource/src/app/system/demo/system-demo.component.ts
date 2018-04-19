import { Component, OnInit } from '@angular/core'
import {SysNewDemoDialogComponent} from './new-demo.dialog'
import {MatDialog} from '@angular/material'
import {SysDemoService} from './sys-demo.service'
import appAlert from '../../utils/alert'

@Component({
  selector: 'app-system-demo',
  templateUrl: 'system-demo.component.html',
  styleUrls: ['system-demo.component.less']
})
export class SystemDemoComponent implements OnInit {
  sysDemoData: any[] = []
  params: any = {pageSize: 20, currentPageNo: 1} /**请求后端数据的参数**/
  totalCount = 0 /*总数据条数，设置默认是0*/
  isActive // 是否激活
  statuses
  loadingIndicator = true
  isPermission// 是否有权限
  isSpinner = 1// 加载进度

  constructor(public _dialog: MatDialog,
              private sysDemoService: SysDemoService) {
    this.sysDemoData = this.sysDemoService.sysDemoData
  }

  ngOnInit() {
    this.reloadSysDemoCount()
    this.isActive = ['未激活', '已激活']
    this.statuses = ['不可用', '可用']
  }

  /**格式化数据：是否激活解析（1激活，0未激活）创建时间**/
  formatData(rows) {
    rows.forEach(item => {
      item.activeName = this.isActive[item.active]
      item.statusName = this.statuses[item.status]
    })
  }

  /**加载 实例管理 数据**/
  reloadSysDemoCount() {
    this.sysDemoService.reloadSysDemo(this.params)
      .subscribe(page => {
        this.totalCount = page.data.totalCount
        if (page.data.status === 0) {
          this.isSpinner = 0
          if (page.data.permission === 0) {
            this.isPermission = 1
            this.sysDemoData = [...page.data.result]
            this.formatData(this.sysDemoData)
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
    } else if (event === 'renew') {
      this.reloadSysDemoCount()
    }
  }

  /**打开 新建dialog**/
  newDialog() {
    const config = SysNewDemoDialogComponent.config
    let dialogRef = this._dialog.open(SysNewDemoDialogComponent, config)
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result !== 'cancel') {
        this.reloadSysDemoCount()
      }
      config.data = {}
      dialogRef = null
    })
  }

  /**修改每页展示的数据条数pageSize**/
  getLimit(event) {
    Object.assign(this.params, {currentPageNo: 1 , pageSize: event})
    this.reloadSysDemoCount()
  }

  /**点击操作按钮：编辑，删除**/
  operateButton(value, row, rowIndex) {
    if (value === 0) { // 编辑
      const temRow = Object.assign({}, row)
      const config = SysNewDemoDialogComponent.config
      config.data = temRow
      let dialogRef = this._dialog.open(SysNewDemoDialogComponent, config)
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result && result !== 'cancel') {
          this.reloadSysDemoCount()
        }
        config.data = {}
        dialogRef = null
      })
    }else {// 删除
      appAlert.common.remove('数据', () => {
        this.sysDemoService.deleteSysDemo(row.id)
          .subscribe(page => {
            if (page.data.status === 0) {
              appAlert.common.actionSuccess('删除实例')
              this.reloadSysDemoCount()
            }
          })
      })
    }
  }
}
