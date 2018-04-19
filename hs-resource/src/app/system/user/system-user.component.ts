import { Component, OnInit } from '@angular/core'
import {SysNewUserDialogComponent} from './new-user.dialog'
import {MatDialog} from '@angular/material'
import {SysUserService} from './sys-user.service'
import appAlert from '../../utils/alert'
import {RevisePasswordDialogComponent} from './revise-password.dialog'
import {SysRoleService} from '../role/sys-role.service'
import {LocalStorage} from '../../core/services/localstorage.service'

@Component({
  selector: 'app-system-user',
  templateUrl: 'system-user.component.html',
  styleUrls: ['system-user.component.less']
})

export class SystemUserComponent implements OnInit {
  sysUserData: any[] = []
  params: any = {pageSize: 20, currentPageNo: 1} /**请求后端数据的参数**/
  totalCount = 0 /*总数据条数，设置默认是0*/
  loadingIndicator = true
  roleIdArr: any[]
  isPermission// 是否有权限
  private username = LocalStorage.get('username')
  isSpinner = 1// 加载进度

  constructor(public _dialog: MatDialog,
              private sysUserService: SysUserService,
              private sysRoleService: SysRoleService) {
    this.sysUserData = this.sysUserService.sysUserData
    this.roleIdArr = this.sysRoleService.sysRoleData
  }

  ngOnInit() {
    this.sysRoleService.reloadSysRole({pageSize: 100})
    this.reloadSysUserCount()
  }

  /**加载 用户管理 数据**/
  reloadSysUserCount () {
    this.sysUserService.reloadSysUser(this.params)
      .subscribe(page => {
        this.totalCount = page.data.totalCount
        if (page.data.status === 0) {
          this.isSpinner = 0
          if (page.data.permission === 0) {
            this.sysUserData = [...page.data.result]
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
    const config = SysNewUserDialogComponent.config
    config.data = {roleIdArr: this.roleIdArr}
    let dialogRef = this._dialog.open(SysNewUserDialogComponent, config)
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result !== 'cancel') {
        this.reloadSysUserCount()
        // result.password = Md5.hashStr(result.password).toString()
      }
      config.data = {}
      dialogRef = null
    })
  }

 /**修改每页展示的数据条数pageSize**/
  getLimit(event) {
    Object.assign(this.params, {currentPageNo: 1 , pageSize: event})
   this.reloadSysUserCount()
  }

  /**点击操作按钮：编辑0、修改密码1**/
  operateButton(value, row, rowIndex) {
    console.log(LocalStorage.get('username'), LocalStorage.get('user'))
    if (value === 0) {// 编辑
      if (row.username === 'admin' && LocalStorage.get('username') !== 'admin') {
        appAlert.common.confirmWarning('您不能编辑该用户！')
      } else {
        const temRow = Object.assign({}, row, {roleId: row.role.id, roleIdArr: this.roleIdArr})
        const config = SysNewUserDialogComponent.config
        config.data = temRow
        let dialogRef = this._dialog.open(SysNewUserDialogComponent, config)
        dialogRef.afterClosed().subscribe((result: any) => {
          if (result && result !== 'cancel') {
            this.reloadSysUserCount()
          }
          config.data = {}
          dialogRef = null
        })
      }
    } else if (value === 1) {
      if (row.username === 'admin') {// 修改admin用户的密码
        if (this.username === 'admin') {
          this.resetPassword(row, rowIndex)
        }
      } else {// 修改 非admin 密码
        this.resetPassword(row, rowIndex)
      }
    } else {// 删除
      if (row.username === 'admin') {
        appAlert.common.confirmWarning('您不能删除该用户！')
      } else {
        appAlert.common.remove('数据', () => {
          this.sysUserService.deleteSysUser(row.id)
            .subscribe(page => {
              if (page.data.status === 0 && page.data.permission === 0) {
                appAlert.common.actionSuccess('删除用户')
                this.reloadSysUserCount()
              }
            })
        })
      }
    }
  }

  /**修改密码**/
  resetPassword(row, rowIndex) {
    const temRow = Object.assign({}, row)
    const config = RevisePasswordDialogComponent.config
    config.data = temRow
    let dialogRef = this._dialog.open(RevisePasswordDialogComponent, config)
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('用户管理-修改密码', result)
      if (result && result !== 'cancel') {
        console.log(result)
        if (result.newPasswordAgain === result.newPassword) {
          const path = '/api/system/user/password'
          const data = {
            username: result.username,
            oldPassword: result.oldPassword,
            newPassword: result.newPassword,
          }
          this.sysUserService.operateSysUser(path, data) // id数据格式修改
          this.sysUserData.splice(rowIndex, 1, result)
        } else {
          appAlert.common.confirmWarning('您输入的新密码与确认密码确认不一致！')
        }
      }
      config.data = {}
      dialogRef = null
    })
  }
}
