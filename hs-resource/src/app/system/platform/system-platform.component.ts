import { Component, OnInit } from '@angular/core'
import {SysNewPlatDialogComponent} from './new-platform.dialog'
import {MatDialog} from '@angular/material'
import {SysPlatformService} from './sys-platform.service'
import appAlert from '../../utils/alert'
import {SysProductService} from '../product/sys-product.service'

@Component({
  selector: 'app-system-platform',
  templateUrl: 'system-platform.component.html',
  styleUrls: ['system-platform.component.less']
})
export class SystemPlatformComponent implements OnInit {
  sysPlatformData: any[] = []
  params: any = {pageSize: 20, currentPageNo: 1} /**请求后端数据的参数**/
  totalCount = 0 /*总数据条数，设置默认是0*/
  loadingIndicator = true
  productIdArr
  isPermission// 是否有权限
  isSpinner = 1// 加载进度

  constructor(public _dialog: MatDialog,
              private sysPlatformService: SysPlatformService,
              private sysProductService: SysProductService) {
    this.sysPlatformData = this.sysPlatformService.sysPlatformData
    this.productIdArr = this.sysProductService.sysProductData
  }

  ngOnInit() {
    this.sysProductService.reloadSysProduct({pageSize: 100})
    this.reloadSysPlatformCount()
  }

  /**加载 平台管理 数据**/
  reloadSysPlatformCount () {
    this.sysPlatformService.reloadSysPlatform(this.params)
      .subscribe(page => {
        this.totalCount = page.data.totalCount
        if (page.data.status === 0) {
          this.isSpinner = 0
          if (page.data.permission === 0) {
            this.sysPlatformData = [...page.data.result]
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
    const config = SysNewPlatDialogComponent.config
    config.data = {productIdArr: this.productIdArr}
    let dialogRef = this._dialog.open(SysNewPlatDialogComponent, config)
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result !== 'cancel') {
        this.reloadSysPlatformCount()
      }
      config.data = {}
      dialogRef = null
    })
  }

  /**修改每页展示的数据条数pageSize**/
  getLimit(event) {
    Object.assign(this.params, {currentPageNo: 1 , pageSize: event})
    this.reloadSysPlatformCount()
  }

  /**点击操作按钮：编辑0、删除1**/
  operateButton(value, row, rowIndex) {
    if (value === 0) {// 编辑
      const temRow = Object.assign({}, row, {productId: row.product.id, productIdArr: this.productIdArr})
      const config = SysNewPlatDialogComponent.config
      config.data = temRow
      let dialogRef = this._dialog.open(SysNewPlatDialogComponent, config)
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result && result !== 'cancel') {
          this.reloadSysPlatformCount()
        }
        config.data = {}
        dialogRef = null
      })
    } else {// 删除
      appAlert.common.remove('数据', () => {
        this.sysPlatformService.deleteSysPlatform(row.id)
          .subscribe(page => {
            if (page.data.status === 0) {
              appAlert.common.actionSuccess('删除平台')
              this.reloadSysPlatformCount()
            }
          })
      })
    }
  }
}
