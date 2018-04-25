import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import appAlert from '../../utils/alert'
import {ConnectionService} from '../../core/services/connection.service'

@Injectable()
export class SysBillStatisticsService {
  /*@observable sysBillStatisticsData: any[] = []*/

  constructor(private connectionService: ConnectionService) {
  }

  /**获取账单数据：get**/
  reloadPaylogsData(params) {
    const path = '/billStatistics'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      if (page.data.result === '0') {
        //if (page.data.permission === 0) {/*请求数据"成功"*/
          /*this.sysBillStatisticsData.length = 0
          this.sysBillStatisticsData.push(...page.data.list)*/
        //}
      } else {
        this.connectionService.isLoginByResult(page.data.description, '账单数据')
      }
    }, err => {
      appAlert.common.actionFailed('请求"账单数据"')
    })
    return configsObservable
  }


}
