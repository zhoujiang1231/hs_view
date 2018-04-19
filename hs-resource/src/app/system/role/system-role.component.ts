import { Component, OnInit } from '@angular/core'
import {SysNewRoleDialogComponent} from './new-role.dialog'
import {MatDialog} from '@angular/material'
import {SysRoleService} from './sys-role.service'
import appAlert from '../../utils/alert'
import {SysDivideModuleDialogComponent} from './divide-module.dialog'
import {LocalStorage} from '../../core/services/localstorage.service'

@Component({
  selector: 'app-system-role',
  templateUrl: 'system-role.component.html',
  styleUrls: ['system-role.component.less']
})
export class SystemRoleComponent implements OnInit {
  sysRoleData: any[] = []
  params: any = {pageSize: 20, currentPageNo: 1} /**请求后端数据的参数**/
  totalCount = 0 /*总数据条数，设置默认是0*/
  loadingIndicator = true
  isPermission// 是否有权限
  isSpinner = 1// 加载进度
  private username = LocalStorage.get('username')

  constructor(public _dialog: MatDialog,
              private sysRoleService: SysRoleService) {
    this.sysRoleData = this.sysRoleService.sysRoleData
  }

  ngOnInit() {
    this.reloadSysRoleCount()
  }

  /**加载 角色管理 数据**/
  reloadSysRoleCount () {
    this.sysRoleService.reloadSysRole(this.params)
      .subscribe(page => {
        this.totalCount = page.data.totalCount
        if (page.data.status === 0) {
          this.isSpinner = 0
          if (page.data.permission === 0) {
            this.sysRoleData = [...page.data.result]
            this.loadingIndicator = false
            this.isPermission = 1
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
    const config = SysNewRoleDialogComponent.config
    let dialogRef = this._dialog.open(SysNewRoleDialogComponent, config)
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result !== 'cancel') {
        this.reloadSysRoleCount()
      }
      config.data = {}
      dialogRef = null
    })
  }

  /**修改每页展示的数据条数pageSize**/
  getLimit(event) {
    Object.assign(this.params, {currentPageNo: 1 , pageSize: event})
    this.reloadSysRoleCount()
  }

  /**点击操作按钮：编辑0，删除1**/
  operateButton(value, row, rowIndex) {
    if (value === 0) {// 编辑
      this.editRole(row)
    } else if (value === 1) {// 删除
      if (row.name === 'admin') {
        appAlert.common.confirmWarning('很抱歉，您不能删除admin角色！')
      } else {
        appAlert.common.remove('数据', () => {
          this.sysRoleService.deleteSysRole(row.id)
            .subscribe(res => {
              if (res.data.status === 0) {
                appAlert.common.actionSuccess('删除角色')
                this.reloadSysRoleCount()
              }
            })
        })
      }
    } else {
      this.divideModule(row)
    }
  }

  /**0编辑角色**/
  editRole(row) {
    if (row.name === 'admin') {
      appAlert.common.confirmWarning('很抱歉，您不能编辑admin角色！')
    } else {
      const temRow = Object.assign({}, row)
      const config = SysNewRoleDialogComponent.config
      config.data = temRow
      let dialogRef = this._dialog.open(SysNewRoleDialogComponent, config)
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result && result !== 'cancel') {
          this.reloadSysRoleCount()
        }
        config.data = {}
        dialogRef = null
      })
    }
  }

  /**2分配模块**/
  divideModule(row) {
    if (row.name === 'admin') {
      appAlert.common.confirmWarning('很抱歉，您不能给admin角色分配模块！')
    } else {
      if (this.username === 'admin') {
        const config = SysDivideModuleDialogComponent.config
        config.data = {roleId: row.id}
        let dialogRef = this._dialog.open(SysDivideModuleDialogComponent, config)
        dialogRef.afterClosed().subscribe((result: any) => {
          if (result && result !== 'cancel') {
          }
          config.data = {}
          dialogRef = null
        })
      } else {
        appAlert.common.confirmWarning('很抱歉，您不能给改角色分配模块！')
      }
    }
  }
}
