import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import appAlert from '../../utils/alert'
import {ConnectionService} from '../../core/services/connection.service'

@Injectable()
export class SysPreNumberFunctionCostLogService {
  /*@observable sysPreNumberFunctionCostLogData: any[] = []*/

  constructor(private connectionService: ConnectionService) {
  }

  /**获取预扣费号码功能费日志：get**/
  reloadPreNumberFunctionCostLogData(params) {
    const path = '/preDeductLog/preNumberFunctionCostLogs'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      // console.log('获取直销部门列表', page.data.msg, page.data.status)
      if (page.data.result === '0') {
        //if (page.data.permission === 0) {/*请求数据"成功"*/
          /*this.sysPreNumberFunctionCostLogData.length = 0
          this.sysPreNumberFunctionCostLogData.push(...page.data.list)*/
        //}
      } else {
        this.connectionService.isLoginByResult(page.data.description, '号码功能费预扣费日志')
      }
    }, err => {
      appAlert.common.actionFailed('请求"号码功能费预扣费日志"')
    })
    return configsObservable
  }


}
