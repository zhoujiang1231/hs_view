import {Component, OnInit} from '@angular/core'
import {SysTimeSearchService} from './sys-realtime-search.service'

@Component({
  selector: 'app-real-time-search',
  templateUrl: 'real-time-search.component.html',
  styleUrls: ['real-time-search.component.less']
})

export class RealTimeSearchComponent implements OnInit {
  isPermission: any = {}// 是否有权限
  params: any = {pageSize: 20 , currentPageNo: 1, searchType: 'Sys'}
  loadingIndicator: any = {fix: true, active: true}
  sysData: any = {leftHalf: [], rightHalf: []}
  spinner: any = {fix: 1, active: 1}// 加载进度
  totalCount = 0 /*总数据条数，设置默认是0*/
  selectArr = [] // 供选择不同的产品级别
  targetList: any = [] // 存放产品级别统计数据

  constructor(private sysTimeSearchService: SysTimeSearchService) {}

  ngOnInit() {
    this.selectArr = [
      {name: '系统统计', type: 'Sys'},
      {name: '产品统计', type: 'Product'},
      {name: '平台统计', type: 'Domain'},
      {name: '业务统计', type: 'Service'},
      {name: '中继组统计', type: 'Trunkgroup'},
      {name: '网关统计', type: 'Gateway'}
    ]
    this.reloadSys()
  }

  /**请求系统统计数据**/
  reloadSys() {
    this.sysData.leftHalf.length = 0
    this.sysData.rightHalf.length = 0
    this.isPermission.active = 0
    this.sysTimeSearchService.reloadSysTimeSearch('')
      .subscribe(page => {
        this.totalCount = page.data.totalCount
        if (page.data.status === 0) {
          this.spinner.fix = 0
          if (page.data.permission === -1) {
            this.isPermission.fix = 0
          } else if (page.data.permission === 0) {
            this.formatSysData(page.data.result)
            this.loadingIndicator.fix = false
            this.isPermission.fix = 1
          }
        }
      }, err => {
        this.spinner.fix = 1
      })
  }

  formatSysData(data) {
    if (data && data.length > 0) {
      const length = data.length
      if (length % 2 === 0) {// 偶数条
        data.forEach((item, index) => {
          if (index < length / 2) {
            this.sysData.leftHalf.push(item)
          } else {
            this.sysData.rightHalf.push(item)
          }
        })
      } else {// 奇数条
        data.forEach((item, index) => {
          if (index < (length + 1) / 2) {
            this.sysData.leftHalf.push(item)
          } else {
            this.sysData.rightHalf.push(item)
          }
        })
      }
    }
  }

  /**查询符合搜索条件的数据**/
  search() {
    this.targetList.length = 0
    this.isPermission.fix = 0
    this[`reload${this.params.searchType}`]()
  }

  /**请求 产品统计**/
  reloadProduct() {
    this.sysTimeSearchService.reloadSearchProduct('')
      .subscribe(page => {
        if (page.data.status === 0) {
          this.spinner.active = 0
          if (page.data.permission === -1) {
            this.isPermission.active = 0
          } else if (page.data.permission === 0) {
            this.targetList.push(...page.data.result)
            this.loadingIndicator.active = false
            this.isPermission.active = 1
          }
        }
      }, err => {
        this.spinner.active = 1
      })
  }

  /**请求 平台统计**/
  reloadDomain() {
    this.sysTimeSearchService.reloadSearchDomain('')
      .subscribe(page => {
        if (page.data.status === 0) {
          this.spinner.active = 0
          if (page.data.permission === -1) {
            this.isPermission.active = 0
          } else if (page.data.permission === 0) {
            this.targetList.push(...page.data.result)
            this.loadingIndicator.active = false
            this.isPermission.active = 1
          }
        }
      }, err => {
        this.spinner.active = 1
      })
  }

  /**请求 业务统计**/
  reloadService() {
    this.sysTimeSearchService.reloadSearchService('')
      .subscribe(page => {
        if (page.data.status === 0) {
          this.spinner.active = 0
          if (page.data.permission === -1) {
            this.isPermission.active = 0
          } else if (page.data.permission === 0) {
            this.targetList.push(...page.data.result)
            this.loadingIndicator.active = false
            this.isPermission.active = 1
          }
        }
      }, err => {
        this.spinner.active = 1
      })
  }

  /**请求 中继组统计**/
  reloadTrunkgroup() {
    this.sysTimeSearchService.reloadSearchTrunkgroup('')
      .subscribe(page => {
        if (page.data.status === 0) {
          this.spinner.active = 0
          if (page.data.permission === -1) {
            this.isPermission.active = 0
          } else if (page.data.permission === 0) {
            this.targetList.push(...page.data.result)
            this.loadingIndicator.active = false
            this.isPermission.active = 1
          }
        }
      }, err => {
        this.spinner.active = 1
      })
  }

  /**请求 网关统计**/
  reloadGateway() {
    this.sysTimeSearchService.reloadSearchGateway('')
      .subscribe(page => {
        if (page.data.status === 0) {
          this.spinner.active = 0
          if (page.data.permission === -1) {
            this.isPermission.active = 0
          } else if (page.data.permission === 0) {
            this.targetList.push(...page.data.result)
            this.loadingIndicator.active = false
            this.isPermission.active = 1
          }
        }
      }, err => {
        this.spinner.active = 1
      })
  }
}
