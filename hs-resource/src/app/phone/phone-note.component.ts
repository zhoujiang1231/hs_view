import { Component, OnInit } from '@angular/core'
import {PhoneNoteService} from './phone.service'
import * as moment from 'moment'
import {BusinessListService} from '../business/business-list.service'
import {DockNetService} from '../dock/dock-net.service'
import {DockGroupService} from '../dock/dock-group.service'
import {FlatpickrOptions} from 'ng2-flatpickr'
import Russian from 'flatpickr/dist/l10n/zh.js'
import {Router} from '@angular/router'
import {LocalStorage} from '../core/services/localstorage.service'
import appAlert from '../utils/alert'

@Component({
  selector: 'app-phone-note',
  templateUrl: 'phone-note.component.html',
  styleUrls: ['phone-note.component.less']
})

export class PhoneNoteComponent implements OnInit {
  phoneNoteData: any[] = []
  params: any = {pageSize: 20, currentPageNo: 1} /**请求后端数据的参数**/
  totalCount = 0 /*总数据条数，设置默认是0*/
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
  businessIdArr
  gatewayIdArr
  trunkGroupIdArr
  stringParams: any = {}
  loadingIndicator = true
  statuses// 状态
  failCodes// 路由失败原因
  endReasons// 挂断原因
  callTypes// 呼叫类型
  isPermission// 是否有权限
  isSpinner// 加载进度

  constructor(private phoneNoteService: PhoneNoteService,
              private businessListService: BusinessListService,
              private dockNetService: DockNetService,
              private dockGroupService: DockGroupService,
              private router: Router) {
    this.phoneNoteData = this.phoneNoteService.phoneNoteData
    this.businessIdArr = this.businessListService.businessList
    this.gatewayIdArr = this.dockNetService.dockNetData
    this.trunkGroupIdArr = this.dockGroupService.dockGroupData
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
    this.statuses = [
      {name: '路由失败', value: 1}, {name: '路由成功', value: 2}, {name: '接通成功', value: 3},
    ]
    this.failCodes = [
      {name: 'acl未通过', value: 1}, {name: '超全局cps', value: 2}, {name: '超全局calls', value: 3},
      {name: '没有prefix', value: 4}, {name: '超产品cps', value: 5}, {name: '超产品calls', value: 6},
      {name: '无路由配置', value: 7}, {name: '无可用路由', value: 8},
    ]
    this.endReasons = [
      {name: '发起者挂断', value: 1}, {name: '转接者挂断', value: 2}, {name: '超时挂断', value: 3}, {name: 'MI挂断', value: 4},
    ]
    this.callTypes = [
      {name: '呼入', value: 1}, {name: '外呼', value: 2}, {name: '预览外呼', value: 4},
      {name: '预测外呼', value: 5}, {name: '主叫外呼', value: 6}, {name: '内部呼叫', value: 9},
    ]
    this.businessListService.reloadBusinessList({pageSize: 100})
    this.dockNetService.reloadDockNet({pageSize: 100})
    this.dockGroupService.reloadDockGroup({pageSize: 100})
  }


  /**格式化数据：是否激活解析（1激活，0未激活）**/
  formatData(rows) {
    rows.forEach(item => {
      if (item.status && item.status !== -1) {
        item.statusName = this.statuses[item.status - 1].name
      }
      if (item.failCode && item.failCode !== -1) {
        item.failCodeName = this.failCodes[item.failCode - 1].name
      }
      if (item.endReason && item.endReason !== -1) {
        item.endReasonName = this.endReasons[item.endReason - 1].name
      }
      if (item.callType && item.callType !== -1) {
        if (item.callType === 1 || item.callType === 2) {
          item.callTypeName = this.callTypes[item.callType - 1].name
        } else if (item.callType === 9) {
          item.callTypeName = this.callTypes[5].name
        } else {
          item.callTypeName = this.callTypes[item.callType - 2].name
        }
      }
    })
  }

  /**加载 话单 列表**/
  reloadPhoneNoteCount () {
    this.isSpinner = 1
    this.loadingIndicator = true
    this.phoneNoteService.reloadPhoneNote(this.params)
      .subscribe(page => {
        this.totalCount = page.data.totalCount
        this.isSpinner = 0
        if (page.data.status === 0) {
          if (page.data.permission === 0) {
            this.isPermission = 1
            this.loadingIndicator = false
            this.phoneNoteData = page.data.result
            this.formatData(this.phoneNoteData)
          } else if (page.data.permission === -1) {
            this.isPermission = 0
          }
        }
      })
  }

  /**修改每页展示的数据条数pageSize**/
  getLimit(event) {
    Object.assign(this.params, {currentPageNo: 1 , pageSize: event})
    this.reloadPhoneNoteCount()
  }

  /**点击 搜索按钮**/
  search() {
    if (this.params.startTime && this.params.endTime) {
      if (this.stringParams.enterpriseId) {
        this.params.enterpriseId = Number(this.stringParams.enterpriseId)
      } else {
        delete this.params.enterpriseId
      }
      this.reloadPhoneNoteCount()
    } else {
      appAlert.common.confirmWarning('请选择"请求时间"！')
    }
  }

  /**操作按钮**/
  operateButton(row) {
    this.router.navigate(['/index/daily/route'])
    LocalStorage.set('callId', row.callId)
  }
}
