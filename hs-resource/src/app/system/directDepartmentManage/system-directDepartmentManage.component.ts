import { Component, OnInit } from '@angular/core'
import {MatDialog} from '@angular/material'
import {NewDirectDepartmentManageDialogComponent} from './new-directDepartmentManage.dialog'
import appAlert from '../../utils/alert'
import {SysDitectDepartmentManageService} from './sys-directDepartmentManage.service'

@Component({
  selector: 'app-system-directDepartmentManage',
  templateUrl: 'system-directDepartmentManage.component.html',
  styleUrls: ['system-directDepartmentManage.component.less']
})

export class SystemDirectDepartmentManageComponent implements OnInit {
  sysDepartmentData: any[] = []
  params: any = {limit: 10, start: 0} /**请求后端数据的参数**/
  totalCount = 0 /*总数据条数，设置默认是0*/
  loadingIndicator = true
  isPermission// 是否有权限
  isSpinner = 1// 加载进度

  constructor(public _dialog: MatDialog,
              private sysDitectDepartmentManageService: SysDitectDepartmentManageService) {
  }

  ngOnInit() {
    this.reloadSysProductCount()
  }

  /**加载 直销部门 数据**/
  reloadSysProductCount () {
    this.sysDitectDepartmentManageService.reloadAllDirectDepartment(this.params)
      .subscribe(page => {
        this.totalCount = page.data.page.totalCount
        if (page.data.result === '0') {
          this.isSpinner = 0
            this.isPermission = 1
            this.sysDepartmentData = [...page.data.list]
            this.loadingIndicator = false
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
    const config = NewDirectDepartmentManageDialogComponent.config
    let dialogRef = this._dialog.open(NewDirectDepartmentManageDialogComponent, config)
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result !== 'cancel') {
          this.reloadSysProductCount()
      }
      config.data = {}
      dialogRef = null
    })
  }

  /**修改每页展示的数据条数pageSize**/
  getLimit(event) {
    Object.assign(this.params, {limit: event})
    this.reloadSysProductCount()
  }

  /**点击操作按钮：编辑产品、编辑配置、删除**/
  operateButton(value, row) {
    console.log(row)
    if (value === 0) {// 编辑
      const temRow = Object.assign({}, row)
      const config = NewDirectDepartmentManageDialogComponent.config
      config.data = temRow
      let dialogRef = this._dialog.open(NewDirectDepartmentManageDialogComponent, config)
      dialogRef.afterClosed().subscribe((result: any) => {
        console.log(result)
        if (result && result !== 'cancel') {
          this.reloadSysProductCount()
        }
        config.data = {}
        dialogRef = null
      })
    } else if (value === 1) {// 删除
        if (row.managerNum>0){
            appAlert.common.actionFailed('该直销部门删除失败')
        }else {
            appAlert.common.remove('直销部门', () => {
                this.sysDitectDepartmentManageService.deleteDirectDepartment(row.id)
                    .subscribe(page => {
                        if (page.data.result === '0') {
                            appAlert.common.actionSuccess('删除直销部门成功')
                            this.reloadSysProductCount()
                        }
                    })
            })
        }
    }
  }
}
