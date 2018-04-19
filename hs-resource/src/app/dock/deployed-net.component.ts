import {Component, Inject, OnInit} from '@angular/core'
import {DockGroupService} from './dock-group.service'
import {NewNetFromGroupDialogComponent} from './dialogs/new-net-from-group.dialog'
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material'
import {DockNetService} from './dock-net.service'
import appAlert from '../utils/alert'
import {NewGroupNetDialogComponent} from './dialogs/new-group-net.dialog'
import appUtil from '../utils/pro-util'

@Component({
  selector: 'app-deploy-net',
  templateUrl: 'deployed-net.component.html',
  styleUrls: ['deployed-net.component.less']
})

export class DeployedNetComponent implements OnInit {
  public static config: MatDialogConfig = {
    disableClose: false,
    width: '900px',
    minHeight: '200px',
    data: {}
  }
  deployGateway// 已配置的网关列表 数据
  params: any = {pageSize: 20, currentPageNo: 1} /**请求后端数据的参数**/
  totalCount = 0 /*总数据条数，设置默认是0*/
  isActive // 是否激活
  statuses // 监控状态是否打开
  loadingIndicator = true
  isPermission// 是否有权限

  constructor(public _dialog: MatDialog,
              private dockGroupService: DockGroupService,
              private dockNetService: DockNetService,
              public dialogRef: MatDialogRef<NewGroupNetDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.deployGateway = this.dockGroupService.deployGateway
  }

  ngOnInit() {
    this.dockNetService.reloadDockNet({pageSize: 100})
    this.isActive = ['未激活', '已激活']
    this.statuses = ['关闭', '打开']
    this.params.id = this.data.id
    this.reloadDeployNetCount()
  }

  /**格式化数据：是否激活解析（1激活，0未激活）**/
  formatData(rows) {
    rows.forEach(item => {
      item.activeName = this.isActive[item.active]
      item.statusName = this.statuses[item.status]
    })
  }

  /**加载数据 中继组数据**/
  reloadDeployNetCount() {
    this.dockGroupService.reloadDeployNetList(appUtil.filterParams(this.params))
      .subscribe(page => {
        this.totalCount = page.data.totalCount
        if (page.data.status === 0) {
          if (page.data.permission === 0) {
            this.deployGateway = [...page.data.result]
            this.formatData(this.deployGateway)
            this.loadingIndicator = false
            this.isPermission = 1
          } else if (page.data.permission === -1) {
            this.isPermission = 0
          }
        }
      })
  }

  /***点击 加号图标 中继组新增网关**/
  addDeployNet() {
    const config = NewNetFromGroupDialogComponent.config
    config.data = {trunkGroupId: this.params.id, gatewayIdArr: this.dockNetService.dockNetData}
    let dialogRef = this._dialog.open(NewNetFromGroupDialogComponent, config)
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result !== 'cancel') {
        this.reloadDeployNetCount()
      }
      config.data = {}
      dialogRef = null
    })
  }

  /**操作按钮：中继组删除网关**/
  operateButton(value, row, rowIndex) {
    switch (value) {
      case 'edit' : {
        const temRow = Object.assign(row, {trunkGroupId: this.params.id, gatewayIdArr: this.dockNetService.dockNetData})
        const config = NewNetFromGroupDialogComponent.config
        config.data = temRow
        let dialogRef = this._dialog.open(NewNetFromGroupDialogComponent, config)
        dialogRef.afterClosed().subscribe((result: any) => {
          if (result && result !== 'cancel') {
            // this.reloadDeployNetCount()
          }
          config.data = {}
          dialogRef = null
        })
        break
      }
      case 'delete' : {
        appAlert.common.remove('网关数据', () => {
          this.dockGroupService.deleteNetFromDockGroup(row.id, this.data.id)
            .subscribe(page => {
              if (page.data.status === 0) {
                appAlert.common.actionSuccess('中继组删除网关')
                this.reloadDeployNetCount()
              }
            })
        })
        break
      }
    }
  }

  /**修改每页展示的数据条数pageSize**/
  getLimit(event) {
    Object.assign(this.params, {currentPageNo: 1 , pageSize: event})
    this.reloadDeployNetCount()
  }

}
