import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import {ConnectionService} from '../core/services/connection.service'
import appAlert from '../utils/alert'

@Injectable()
export class DailyService {
  @observable dailyRouter: any[] = []
  @observable dailyOperate: any[] = []

  constructor(private connectionService: ConnectionService) {}

  /**请求 路由日志列表**/
  reloadRepRouter(params) {
    const path = '/api/logRouters'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      // console.log('路由日志', page.data.msg, page.data.status)
      if (page.data.status === 0) {
        if (page.data.permission === 0) {/*请求数据"成功"*/
          this.dailyRouter.length = 0
          this.dailyRouter.push(...page.data.result)
        }
      } else {
        this.connectionService.isLoginByResult(page.data.msg, '路由日志列表')
      }
    }, err => {
      appAlert.common.actionFailed('请求"路由日志列表"')
    })
    return configsObservable
  }

  /**请求 操作日志列表**/
  reloadRepOperate(params) {
    const path = '/api/logActions'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      // console.log('操作日志', page.data.msg, page.data.status)
      if (page.data.status === 0) {
        if (page.data.permission === 0) {/*请求数据"成功"*/
          this.dailyOperate.length = 0
          this.dailyOperate.push(...page.data.result)
        }
      } else {
        this.connectionService.isLoginByResult(page.data.msg, '操作日志列表')
      }
    }, err => {
      appAlert.common.actionFailed('请求"操作日志列表"')
    })
    return configsObservable
  }
}
