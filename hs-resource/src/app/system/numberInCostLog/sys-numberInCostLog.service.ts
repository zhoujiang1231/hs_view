import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import appAlert from '../../utils/alert'
import {ConnectionService} from '../../core/services/connection.service'

@Injectable()
export class SysNumberInCostLogService {
  /*@observable sysNumberInCostLogData: any[] = []*/

  constructor(private connectionService: ConnectionService) {
  }

  /**获取呼入资费日志：get**/
  reloadNumberInCostLogData(params) {
    const path = '/numberInCostLogs'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      // console.log('获取直销部门列表', page.data.msg, page.data.status)
      if (page.data.result === '0') {
        //if (page.data.permission === 0) {/*请求数据"成功"*/
          /*this.sysNumberInCostLogData.length = 0
          this.sysNumberInCostLogData.push(...page.data.list)*/
        //}
      } else {
        this.connectionService.isLoginByResult(page.data.description, '呼入资费扣费详情')
      }
    }, err => {
      appAlert.common.actionFailed('请求"呼入资费扣费详情日志"')
    })
    return configsObservable
  }


}
