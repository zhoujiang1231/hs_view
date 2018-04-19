import {Component, OnInit} from '@angular/core'
import {SysUserService} from '../../system/user/sys-user.service'
import * as moment from 'moment'
import {FlatpickrOptions} from 'ng2-flatpickr'
import Russian from 'flatpickr/dist/l10n/zh.js'
import {DailyService} from '../daily.service'

@Component({
  selector: 'app-daily-operate',
  templateUrl: 'daily-operate.component.html',
  styleUrls: ['daily-operate.component.less']
})

export class DailyOperateComponent implements OnInit {
  dailyOperate: any[] = [] /**table数据**/
  params: any = {pageSize: 20, currentPageNo: 1} /**请求后端数据的参数**/
  types = []
  userIdArr
  dateRangeOptions: FlatpickrOptions = {
    locale: Russian.zh,
    enableTime: true,
    noCalendar: false,
    enableSeconds: true, // disabled by default
    time_24hr: true, // AM/PM time picker is used by default
    dateFormat: 'Y-m-d H:i:S',
  }
  startTimeOptions
  endTimeOptions
  loadingIndicator = true
  isPermission// 是否有权限
  isSpinner = 1// 加载进度
  totalCount = 0

  constructor(private dailyService: DailyService,
              private sysUserService: SysUserService) {
    this.dailyOperate = this.dailyService.dailyOperate
    this.userIdArr = this.sysUserService.sysUserData
    this.startTimeOptions = Object.assign({}, this.dateRangeOptions,
      {defaultDate: 'today'}, {
      onChange: event => {
        this.params.startTime = moment(event[0]).format('YYYY-MM-DD HH:mm:ss')
      }
    })
    this.endTimeOptions = Object.assign({}, this.dateRangeOptions,
      {defaultDate: moment({hour: 23, minute: 59, seconds: 59}).format('YYYY-MM-DD HH:mm:ss')}, {
      onChange: event => {
        this.params.endTime = moment(event[0]).format('YYYY-MM-DD HH:mm:ss')
      }
    })
  }

  ngOnInit() {
    this.params.startTime = moment({hour: 0}).format('YYYY-MM-DD HH:mm:ss')
    this.params.endTime = moment({hour: 23, minute: 59, seconds: 59}).format('YYYY-MM-DD HH:mm:ss')
    this.sysUserService.reloadSysUser({pageSize: 100})
    this.types = ['增', '删', '改', '查', '导出', '登录', '退出']
    this.reload()
  }

  /**加载 操作日志 数据**/
  reload(event?) {
    this.loadingIndicator = true
    this.dailyOperate.length = 0
    this.dailyService.reloadRepOperate(this.params)
      .subscribe(page => {
        this.totalCount = page.data.totalCount
        if (page.data.status === 0) {
          this.isSpinner = 0
          if (page.data.permission === 0) {
            this.dailyOperate = [...page.data.result]
            this.formatData(this.dailyOperate)
            this.loadingIndicator = false
            this.isPermission = 1
          } else if (page.data.permission === -1) {
            this.isPermission = 0
          }
        }
      })
  }

  /**格式化数据：数据解析**/
  formatData(rows) {
    rows.forEach(item => {
      item.typeName = this.types[item.type - 1]
      item.objectName = JSON.parse(item.object)
    })
  }

  /**关键词搜索**/
  search() {/*time需转为int类型*/
    this.reload()
  }

  /**修改每页展示的数据条数pageSize**/
  getLimit(event) {
    Object.assign(this.params, {currentPageNo: 1, pageSize: event})
    this.reload()
  }
  /**查询当前页**/
  // changePage(event) {
  //   Object.assign(this.params, {currentPageNo: event})
  //   this.reload()
  // }

}
