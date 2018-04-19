import { Component, OnInit } from '@angular/core'
import {NewGroupNetDialogComponent} from './dialogs/new-group-net.dialog'
import {MatDialog} from '@angular/material'
import appAlert from '../utils/alert'
import {DockGroupService} from './dock-group.service'
import {DeployedNetComponent} from './deployed-net.component'

@Component({
  selector: 'app-dock',
  templateUrl: 'dock-net-list.component.html',
  styleUrls: ['dock-net-list.component.less']
})
export class DockNetListComponent implements OnInit {
  dockGroupData: any[]
  params: any = {pageSize: 20, currentPageNo: 1} /**请求后端数据的参数**/
  isActive // 是否激活
  loadingIndicator = true
  isPermission// 是否有权限
  isSpinner = 1// 加载进度
  totalCount = 0

  constructor(public _dialog: MatDialog,
              private dockGroupService: DockGroupService) {
    this.dockGroupData = this.dockGroupService.dockGroupData
  }

  ngOnInit() {
    this.reload()
    this.isActive = ['未激活', '已激活']
  }

  /**格式化数据：是否激活解析（1激活，0未激活）**/
  formatData(rows) {
    rows.forEach(item => item.activeName = this.isActive[item.active])
  }

  /**加载数据 中继组数据**/
  reload() {
    this.dockGroupService.reloadDockGroup(this.params)
      .subscribe(page => {
        this.totalCount = page.data.totalCount
        if (page.data.status === 0) {
          this.isSpinner = 0
          if (page.data.permission === 0) {
            this.isPermission = 1
            this.dockGroupData = [...page.data.result]
            this.formatData(this.dockGroupData)
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
    const config = NewGroupNetDialogComponent.config
    let dialogRef = this._dialog.open(NewGroupNetDialogComponent, config)
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result !== 'cancel') {
        this.reload()
      }
      config.data = {}
      dialogRef = null
    })
  }

  /**修改每页展示的数据条数pageSize**/
  getLimit(event) {
    Object.assign(this.params, {currentPageNo: 1 , pageSize: event})
    this.reload()
  }
  /**查询当前页**/
  // changePage(event) {
  //   Object.assign(this.params, {currentPageNo: event})
  //   this.reload()
  // }

  /**点击操作按钮：编辑0、删除1、新增网关2、删除网关3**/
  operateButton(value, row, rowIndex) {
    if (value === 0) {// 编辑
      this.editNetGroup (row, rowIndex)
    } else if (value === 1) {// 删除中继组
      appAlert.common.remove('中继组数据', () => {
        this.dockGroupService.deleteDockGroup(row.id)
          .subscribe(page => {
            if (page.data.status === 0) {
              appAlert.common.actionSuccess('删除中继组')
              this.reload()
            }
          })
      })
    } else if (value === 2) {// 查看已配置的网关列表
      const temRow = Object.assign({}, row)
      const config = DeployedNetComponent.config
      config.data = temRow
      let dialogRef = this._dialog.open(DeployedNetComponent, config)
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result && result !== 'cancel') {
        }
        config.data = {}
        dialogRef = null
      })
    }
  }

  /**编辑中继组**/
  editNetGroup (row, rowIndex) {
    const temRow = Object.assign({}, row)
    const config = NewGroupNetDialogComponent.config
    config.data = temRow
    let dialogRef = this._dialog.open(NewGroupNetDialogComponent, config)
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result !== 'cancel') {
        this.reload()
      }
      config.data = {}
      dialogRef = null
    })
  }
}
