import { Component, OnInit } from '@angular/core'
import {RepCompanyService} from './company.service'
import {DockNetService} from '../../dock/dock-net.service'
import {DockGroupService} from '../../dock/dock-group.service'
import {FlatpickrOptions} from 'ng2-flatpickr'
import Russian from 'flatpickr/dist/l10n/zh.js'
import * as moment from 'moment'
import appAlert from '../../utils/alert'
import {SysDemoService} from '../../system/demo/sys-demo.service'
import {ConnectionService} from '../../core/services/connection.service'

@Component({
  selector: 'app-en-day-statement',
  templateUrl: 'en-day-statement.component.html',
  styleUrls: ['en-day-statement.component.less']
})

export class ComDayStatementComponent implements OnInit {
  dayCompanyData: any[] = []
  params: any = {pageSize: 20, currentPageNo: 1} /**请求后端数据的参数**/
  totalCount = 0 /*总数据条数，设置默认是0*/
  gatewayIdArr
  trunkGroupIdArr
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

  constructor(private repCompanyService: RepCompanyService,
              private dockNetService: DockNetService,
              private dockGroupService: DockGroupService,
              private sysDemoService: SysDemoService,
              private connectionService: ConnectionService) {
    this.gatewayIdArr = this.dockNetService.dockNetData
    this.trunkGroupIdArr = this.dockGroupService.dockGroupData
    this.opensipsIdArr = this.sysDemoService.sysDemoData
    this.searchDayOptions = Object.assign({}, this.dateOptions, {
      onChange: event => {
        this.params.day = moment(event[0]).format('YYYY-MM-DD')
      }
    })
  }

  ngOnInit() {
    this.params.day = moment().subtract(1, 'd').format('YYYY-MM-DD')
    this.dockNetService.reloadDockNet({pageSize: 100})
    this.dockGroupService.reloadDockGroup({pageSize: 100})
    this.sysDemoService.reloadSysDemo({pageSize: 100})
  }

  /**点击 搜索按钮**/
  search() {// 数据格式
    if (!this.params.day) {
      appAlert.common.confirmWarning('请选择查询日期')
    } else {
      this.reloadDayCompanyCount()
    }
  }

  /**加载 企业日报 数据**/
  reloadDayCompanyCount() {
    this.isSpinner = 1
    this.loadingIndicator = true
    this.dayCompanyData.length = 0
    this.repCompanyService.reloadDayCompany(this.params)
      .then(page => {
        this.totalCount = page.data.totalCount
        this.isSpinner = 0
        if (page.data.status === 0) {
          if (page.data.permission === 0) {
            this.isPermission = 1
            this.loadingIndicator = false
            if (page.data.result) {
              this.dayCompanyData = [...page.data.result.list]
              Object.assign(this.summaryData, page.data.result.summary)
            }
          } else if (page.data.permission === -1) {
            this.isPermission = 0
          }
        } else {
          this.connectionService.isLoginByResult(page.data.msg, '网关日报表')
        }
      })
      .catch(err => {
        appAlert.common.actionFailed('请求"网关日报表"')
      })
  }

  /**修改每页展示的数据条数pageSize**/
  getLimit(event) {
    Object.assign(this.params, {currentPageNo: 1 , pageSize: event})
    this.reloadDayCompanyCount()
  }
}
