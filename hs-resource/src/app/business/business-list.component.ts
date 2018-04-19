import {Component, OnInit} from '@angular/core'
import {NewBusinessListDialogComponent} from './dialog/new-business-list.dialog'
import {MatDialog} from '@angular/material'
import appAlert from '../utils/alert'
import {BusinessListService} from './business-list.service'
import {SysPlatformService} from '../system/platform/sys-platform.service'
import {SysProductService} from '../system/product/sys-product.service'
import {Router} from '@angular/router'
import {LocalStorage} from '../core/services/localstorage.service'

@Component({
  selector: 'app-business-list',
  templateUrl: 'business-list.component.html',
  styleUrls: ['business-list.component.less']
})

export class BusinessListComponent implements OnInit {
  businessList: any[]
  params: any = {pageSize: 20, currentPageNo: 1} /**请求后端数据的参数**/
  totalCount = 0 /*总数据条数，设置默认是0*/
  isActive // 是否激活
  domainIdArr
  productIdArr
  loadingIndicator = true
  isPermission// 是否有权限
  isSpinner = 1// 加载进度

  constructor(public _dialog: MatDialog,
              private businessListService: BusinessListService,
              private sysPlatformService: SysPlatformService,
              private sysProductService: SysProductService,
              private router: Router) {
    this.businessList = this.businessListService.businessList
    this.domainIdArr = this.sysPlatformService.sysPlatformData
    this.productIdArr = this.sysProductService.sysProductData
  }

  ngOnInit() {
    this.sysPlatformService.reloadSysPlatform({pageSize: 100})
    this.sysProductService.reloadSysProduct({pageSize: 100})
    this.reloadBusinessListCount()
    this.isActive = ['未激活', '已激活']
  }

  /**格式化数据：是否激活解析（1激活，0未激活）**/
  formatData(rows) {
    rows.forEach(item => {
      item.activeName = this.isActive[item.active]
    })
  }

  /**加载 业务列表 数据**/
  reloadBusinessListCount () {
    this.loadingIndicator = true
    this.businessListService.reloadBusinessList(this.params)
      .subscribe(page => {
        this.totalCount = page.data.totalCount
        if (page.data.status === 0) {
          this.isSpinner = 0
          if (page.data.permission === 0) {
            this.businessList = [...page.data.result]
            this.formatData(this.businessList)
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
    const config = NewBusinessListDialogComponent.config
    config.data = {domainIdArr: this.domainIdArr}
    let dialogRef = this._dialog.open(NewBusinessListDialogComponent, config)
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result !== 'cancel') {
        this.reloadBusinessListCount()
      }
      config.data = {}
      dialogRef = null
    })
  }

  /**修改每页展示的数据条数pageSize**/
  getLimit(event) {
    Object.assign(this.params, {currentPageNo: 1 , pageSize: event})
    this.reloadBusinessListCount()
  }


  /**点击 搜索按钮**/
  search() {
    this.reloadBusinessListCount()
  }

  /**操作按钮**/
  operateButton(value, row, rowIndex) {
    if (value === 0) {/**编辑**/
      const temRow = Object.assign({}, row, {domainId: row.domain.id, domainIdArr: this.domainIdArr})
      // const temRow = JSON.parse(JSON.stringify(row))
      const config = NewBusinessListDialogComponent.config
      config.data = temRow
      let dialogRef = this._dialog.open(NewBusinessListDialogComponent, config)
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result && result !== 'cancel') {
          this.reloadBusinessListCount()
        }
        config.data = {}
        dialogRef = null
      })
    } else if (value === 1) {/**删除**/
      appAlert.common.remove('数据', () => {
        this.businessListService.deleteBusinessList(row.id)
          .then(res => {
            if (res.data.status === 0) {
              if (res.data.permission === -1) {
                appAlert.common.confirmWarning(res.data.msg || '没有权限进行此操作！')
              } else {
                appAlert.common.actionSuccess('删除业务')
                this.reloadBusinessListCount()
              }
            } else {
              console.log(res.data.msg)
              appAlert.common.actionFailed('删除业务')
            }
          })
          .catch(err => {
            appAlert.common.actionFailed('删除业务')
          })
      })
    } else if (value === 2) {/**查看业务路由**/
      this.router.navigate(['/index/business/router'])
      LocalStorage.set('serviceId', row.id)
    }
  }
}
