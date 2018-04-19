import {Component, OnInit} from '@angular/core'
import {NewBusinessRouterDialogComponent} from './dialog/new-business-router.dialog'
import {MatDialog} from '@angular/material'
import appAlert from '../utils/alert'
import {BusinessRouterService} from './business-router.service'
import {BusinessActionDialogComponent} from './dialog/action.dialog'
import {BusinessListService} from './business-list.service'
import {LocalStorage} from '../core/services/localstorage.service'

@Component({
  selector: 'app-business-router',
  templateUrl: 'business-router.component.html',
  styleUrls: ['business-router.component.less']
})

export class BusinessRouterComponent implements OnInit {
  businessRouter: any[] = [] // table数据
  params: any = {pageSize: 20, currentPageNo: 1} /**请求后端数据的参数**/
  totalCount = 0 /*总数据条数，设置默认是0*/
  isActive // 是否激活
  businessList
  loadingIndicator = true
  isPermission// 是否有权限
  isSpinner// 加载进度

  constructor(public _dialog: MatDialog,
              private businessRouterService: BusinessRouterService,
              private businessListService: BusinessListService) {
    this.businessRouter = this.businessRouterService.businessRouter
    this.businessList = this.businessListService.businessList
  }

  ngOnInit() {
    this.businessListService.reloadBusinessList({pageSize: 100})
    this.isActive = ['未激活', '已激活']
    if (LocalStorage.get('serviceId')) {
      this.params.serviceId = LocalStorage.get('serviceId')
      this.reloadBusinessRouterCount()
    }
  }

  /**格式化数据：是否激活解析（1激活，0未激活）**/
  formatData(rows) {
    rows.forEach(item => {
      item.activeName = this.isActive[item.active]
    })
  }

  /**加载 业务路由数据**/
  reloadBusinessRouterCount() {
    this.isSpinner = 1
    this.loadingIndicator = true
    this.businessRouterService.reloadBusinessRouter(this.params)
      .subscribe(page => {
        this.totalCount = page.data.totalCount
        this.isSpinner = 0
        if (page.data.status === 0) {
          if (page.data.permission === 0) {
            this.businessRouter = [...page.data.result]
            this.formatData(this.businessRouter)
            this.loadingIndicator = false
            this.isPermission = 1
          } else if (page.data.permission === -1) {
            this.isPermission = 0
          }
          LocalStorage.remove('serviceId')
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
    const config = NewBusinessRouterDialogComponent.config
    config.data = {businessListArr: this.businessList}
    let dialogRef = this._dialog.open(NewBusinessRouterDialogComponent, config)
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result !== 'cancel') {
        this.reloadBusinessRouterCount()
      }
      config.data = {}
      dialogRef = null
    })
  }

  /**修改每页展示的数据条数pageSize**/
  getLimit(event) {
    Object.assign(this.params, {currentPageNo: 1 , pageSize: event})
    this.reloadBusinessRouterCount()
  }

  /**点击 搜索按钮**/
  search() {// serviceId转化为int
    if (this.params.serviceId) {
      this.params.serviceId = parseInt(this.params.serviceId, 10)
      this.reloadBusinessRouterCount()
    } else {
      appAlert.common.confirmWarning('请输入"业务Id"！', '【数字格式】')
    }
  }

  /**操作按钮**/
  operateButton(value, row, rowIndex) {
    if (value === 0) {/**编辑**/
      const temRow = Object.assign({}, row, {businessListArr: this.businessList})
      const config = NewBusinessRouterDialogComponent.config
      config.data = temRow
      let dialogRef = this._dialog.open(NewBusinessRouterDialogComponent, config)
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result && result !== 'cancel') {
          this.reloadBusinessRouterCount()
        }
        config.data = {}
        dialogRef = null
      })
    } else if (value === 1) {// action列表
      const config = BusinessActionDialogComponent.config
      config.data = {routerId: row.id}
      let dialogRef = this._dialog.open(BusinessActionDialogComponent, config)
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result && result !== 'cancel') {
        }
        config.data = {}
        dialogRef = null
      })
    } else {/**删除**/
      appAlert.common.remove('数据', () => {
        this.businessRouterService.deleteBusinessRouter(row.id)
          .then(res => {
            if (res.data.status === 0) {
              if (res.data.permission === -1) {
                appAlert.common.confirmWarning(res.data.msg || '没有权限进行此操作！')
              } else {
                appAlert.common.actionSuccess('删除业务路由')
                this.reloadBusinessRouterCount()
              }
            } else {
              console.log(res.data.msg)
              appAlert.common.actionFailed('删除业务路由')
            }
          })
          .catch(err => {
            appAlert.common.actionFailed('删除业务路由')
          })
      })
    }
  }
}
