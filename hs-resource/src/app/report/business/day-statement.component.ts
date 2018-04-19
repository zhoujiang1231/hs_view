import { Component, OnInit } from '@angular/core'
import {RepBusinessService} from './business.service'
import {BusinessListService} from '../../business/business-list.service'
import {SysProductService} from '../../system/product/sys-product.service'
import {SysPlatformService} from '../../system/platform/sys-platform.service'
import {FlatpickrOptions} from 'ng2-flatpickr'
import Russian from 'flatpickr/dist/l10n/zh.js'
import * as moment from 'moment'
import appAlert from '../../utils/alert'
import {SysDemoService} from '../../system/demo/sys-demo.service'
import {ConnectionService} from '../../core/services/connection.service'

@Component({
  selector: 'app-bus-day-statement',
  templateUrl: 'day-statement.component.html',
  styleUrls: ['day-statement.component.less']
})

export class BusDayStatementComponent implements OnInit {
  dayBusinessData: any[] = []
  params: any = {pageSize: 20, currentPageNo: 1} /**请求后端数据的参数**/
  totalCount = 0 /*总数据条数，设置默认是0*/
  businessIdArr
  productIdArr
  domainIdArr
  opensipsIdArr
  dateOptions: FlatpickrOptions = {
    locale: Russian.zh,
    enableTime: false,
    noCalendar: false,
    enableSeconds: false, // disabled by default
    time_24hr: false, // AM/PM time picker is used by default
    dateFormat: 'Y-m-d',
    defaultDate: moment().subtract(1, 'd').format('YYYY-MM-DD'),
  }
  searchDayOptions: FlatpickrOptions
  loadingIndicator = true
  isPermission// 是否有权限
  isSpinner// 加载进度
  summaryData: any = {}// 存放总计数据

  constructor(private repBusinessService: RepBusinessService,
              private businessListService: BusinessListService,
              private sysProductService: SysProductService,
              private sysPlatformService: SysPlatformService,
              private sysDemoService: SysDemoService,
              private connectionService: ConnectionService) {
    this.businessIdArr = this.businessListService.businessList
    this.productIdArr = this.sysProductService.sysProductData
    this.domainIdArr = this.sysPlatformService.sysPlatformData
    this.opensipsIdArr = this.sysDemoService.sysDemoData
    this.searchDayOptions = Object.assign({}, this.dateOptions, {
      onChange: event => {
        this.params.day = moment(event[0]).format('YYYY-MM-DD')
      }
    })
  }

  ngOnInit() {
    this.params.day = moment().subtract(1, 'd').format('YYYY-MM-DD')
    this.businessListService.reloadBusinessList({pageSize: 100})
    this.sysProductService.reloadSysProduct({pageSize: 100})
    this.sysPlatformService.reloadSysPlatform({pageSize: 100})
    this.sysDemoService.reloadSysDemo({pageSize: 100})
  }

  /**点击 搜索按钮**/
  search() {// 参数格式转化
    if (!this.params.day) {
      appAlert.common.confirmWarning('请选择查询日期')
    } else {
      this.reloadDayBusinessCount()
    }
  }

  /**加载 业务日报 数据**/
  reloadDayBusinessCount() {
    this.isSpinner = 1
    this.loadingIndicator = true
    this.dayBusinessData.length = 0
    this.repBusinessService.reloadDayBusiness(this.params)
      .then(page => {
        this.totalCount = page.data.totalCount
        this.isSpinner = 0
        if (page.data.status === 0) {
          if (page.data.permission === 0) {
            this.isPermission = 1
            this.loadingIndicator = false
            if (page.data.result) {
              this.dayBusinessData = [...page.data.result.list]
              Object.assign(this.summaryData, page.data.result.summary)
            }
          } else if (page.data.permission === -1) {
            this.isPermission = 0
          }
        } else {
          this.connectionService.isLoginByResult(page.data.msg, '业务日报表')
        }
      })
      .catch(err => {
        appAlert.common.actionFailed('请求"业务日报表"')
      })
  }

  /**修改每页展示的数据条数pageSize**/
  getLimit(event) {
    Object.assign(this.params, {currentPageNo: 1 , pageSize: event})
    this.reloadDayBusinessCount()
  }
}
