import {Component, Inject, OnInit} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material'
import {SysProductService} from './sys-product.service'
import {SysProductSettingDialogComponent} from './edit-product-setting.dialog'
import appAlert from '../../utils/alert'

@Component({
  selector: 'app-sys-product-set-list',
  templateUrl: 'sys-product-setting.component.html',
})

export class SysProductSettingComponent implements OnInit {
  public static config: MatDialogConfig = {
    disableClose: false,
    width: '900px',
    minHeight: '200px',
    data: {}
  }
  sysSettingData: any[] = []// 产品设置列表
  params: any = {pageSize: 20 , currentPageNo: 1} /**请求后端数据的参数**/
  totalCount = 0 /*总数据条数，设置默认是0*/
  productIdArr
  loadingIndicator = true
  isPermission// 是否有权限

  constructor(public _dialog: MatDialog,
              private sysProductService: SysProductService,
              public dialogRef: MatDialogRef<SysProductSettingComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.sysSettingData = this.sysProductService.sysSettingData
    this.productIdArr = this.sysProductService.sysProductData
  }

  ngOnInit() {
    this.sysProductService.reloadSysProduct({pageSize: 100})
    this.params.productId = this.data.id
    this.reloadSysProductSetCount()
  }

  /**加载 产品设置管理 数据**/
  reloadSysProductSetCount () {
    this.sysProductService.reloadSysProductSetting(this.params)
      .subscribe(page => {
        this.totalCount = page.data.totalCount
        if (page.data.status === 0) {
          if (page.data.permission === 0) {
            this.sysSettingData = [...page.data.result]
            this.loadingIndicator = false
            this.isPermission = 1
          } else if (page.data.permission === -1) {
            this.isPermission = 0
          }
        }
      })
  }

  /**修改每页展示的数据条数pageSize**/
  getLimit(event) {
    Object.assign(this.params, {currentPageNo: 1 , pageSize: event})
    this.reloadSysProductSetCount()
  }

  /**点击操作按钮：编辑、删除**/
  operateButton(value, row, rowIndex) {
    if (value === 0) { // 编辑
      const temRow = Object.assign({}, row, {productIdArr: this.productIdArr})
      // const temRow = Object.assign({}, row)
      const config = SysProductSettingDialogComponent.config
      config.data = temRow
      let dialogRef = this._dialog.open(SysProductSettingDialogComponent, config)
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result && result !== 'cancel') {
          this.reloadSysProductSetCount()
        }
        config.data = {}
        dialogRef = null
      })
    } else { // 删除
      appAlert.common.remove('数据', () => {
        this.sysProductService.deleteSysProductSetting(row.id)
          .subscribe(page => {
            if (page.data.status === 0) {
              appAlert.common.actionSuccess('删除产品线设置')
              this.reloadSysProductSetCount()
            }
          })
      })
    }
  }

  /**新增产品线设置**/
  addProductSet() {
    // 传入产品id
    let tempProductId = null
    this.sysSettingData.forEach(item => {
      if (item.productId) {
        tempProductId = item.productId
      }
    })
    const config = SysProductSettingDialogComponent.config
    config.data = {productId: tempProductId, productIdArr: this.productIdArr}
    let dialogRef = this._dialog.open(SysProductSettingDialogComponent, config)
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result !== 'cancel') {
        this.reloadSysProductSetCount()
      }
      config.data = {}
      dialogRef = null
    })
  }
}
