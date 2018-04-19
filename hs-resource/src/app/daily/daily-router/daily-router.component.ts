import {Component, OnInit} from '@angular/core'
import appAlert from '../../utils/alert'
import {LocalStorage} from '../../core/services/localstorage.service'
import {DailyService} from '../daily.service'

@Component({
  selector: 'app-daily-router',
  templateUrl: 'daily-router.component.html',
  styleUrls: ['daily-router.component.less']
})

export class DailyRouterComponent implements OnInit {
  dailyRouter: any[] = []  /**table数据**/
  params: any = {pageSize: 20, currentPageNo: 1}  /**请求后端数据的参数**/
  loadingIndicator = false
  isPermission// 是否有权限
  isSpinner// 加载进度
  totalCount = 0

  constructor(private dailyService: DailyService) {
    this.dailyRouter = this.dailyService.dailyRouter
  }

  ngOnInit() {
    if (LocalStorage.get('callId')) {
      this.params.callId = LocalStorage.get('callId')
      this.reload()
    }
  }

  /**加载 路由日志 数据**/
  reload() {
    this.isSpinner = 1
    this.loadingIndicator = true
    this.dailyRouter.length = 0
    this.dailyService.reloadRepRouter(this.params)
      .subscribe(page => {
        this.totalCount = page.data.totalCount
        this.isSpinner = 0
        if (page.data.status === 0) {
          if (page.data.permission === 0) {
            this.isPermission = 1
            this.loadingIndicator = false
            this.dailyRouter = [...page.data.result]
          } else if (page.data.permission === -1) {
            this.isPermission = 0
          }
        }
        LocalStorage.remove('callId')
      })
  }

  /**关键词搜索**/
  search() {
    if (!this.params.callId) {
      appAlert.common.confirmWarning('请输入callId，再查询！')
    } else {
      this.reload()
    }
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
