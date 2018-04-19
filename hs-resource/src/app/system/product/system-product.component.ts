import { Component, OnInit } from '@angular/core'
import {MatDialog} from '@angular/material'
import {SysNewProductDialogComponent} from './new-product.dialog'
import appAlert from '../../utils/alert'
import {SysProductService} from './sys-product.service'
import {SysProductSettingComponent} from './sys-product-setting.component'

@Component({
  selector: 'app-system-product',
  templateUrl: 'system-product.component.html',
  styleUrls: ['system-product.component.less']
})

export class SystemProductComponent implements OnInit {
  sysProductData: any[] = []
  params: any = {pageSize: 20, currentPageNo: 1} /**请求后端数据的参数**/
  totalCount = 0 /*总数据条数，设置默认是0*/
  loadingIndicator = true
  isPermission// 是否有权限
  isSpinner = 1// 加载进度

  constructor(public _dialog: MatDialog,
              private sysProductService: SysProductService) {
    this.sysProductData = this.sysProductService.sysProductData
  }

  ngOnInit() {
    this.reloadSysProductCount()
  }

  /**加载 产品线列表 数据**/
  reloadSysProductCount () {
    this.sysProductService.reloadSysProduct(this.params)
      .subscribe(page => {
        this.totalCount = page.data.totalCount
        if (page.data.status === 0) {
          this.isSpinner = 0
          if (page.data.permission === 0) {
            this.isPermission = 1
            this.sysProductData = [...page.data.result]
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
    const config = SysNewProductDialogComponent.config
    let dialogRef = this._dialog.open(SysNewProductDialogComponent, config)
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result !== 'cancel') {
        console.log('确定', result)
        this.reloadSysProductCount()
      }
      config.data = {}
      dialogRef = null
    })
  }

  /**修改每页展示的数据条数pageSize**/
  getLimit(event) {
    Object.assign(this.params, {currentPageNo: 1 , pageSize: event})
    console.log('修改每页展示的数据条数pageSize', this.params)
    this.reloadSysProductCount()
  }

  /**点击操作按钮：编辑产品、编辑配置、删除**/
  operateButton(value, row, rowIndex) {
    if (value === 0) {// 编辑
      const temRow = Object.assign({}, row)
      const config = SysNewProductDialogComponent.config
      config.data = temRow
      let dialogRef = this._dialog.open(SysNewProductDialogComponent, config)
      dialogRef.afterClosed().subscribe((result: any) => {
        // console.log(result)
        if (result && result !== 'cancel') {
          this.reloadSysProductCount()
        }
        config.data = {}
        dialogRef = null
      })
    } else if (value === 1) {// 删除
      appAlert.common.remove('数据', () => {
        this.sysProductService.deleteSysProduct(row.id)
          .subscribe(page => {
            if (page.data.status === 0) {
              appAlert.common.actionSuccess('删除产品线')
              this.reloadSysProductCount()
            }
          })
        // this.sysProductData.splice(rowIndex, 1)
        // this.totalCount -= 1
      })
    } else if (value === 2) {// 获取产品设置列表
      const temRow = Object.assign({}, row)
      const config = SysProductSettingComponent.config
      config.data = temRow
      let dialogRef = this._dialog.open(SysProductSettingComponent, config)
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result && result !== 'cancel') {
          // console.log(result)
          // this.dockGroupService.operateDockGroup(result)
          // this.dockGroupData.splice(rowIndex, 1, result)
        }
        config.data = {}
        dialogRef = null
      })
    }
  }
}
