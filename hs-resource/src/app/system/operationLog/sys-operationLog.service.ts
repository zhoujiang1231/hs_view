import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import appAlert from '../../utils/alert'
import {ConnectionService} from '../../core/services/connection.service'

@Injectable()
export class SysOperationLogService {
  /*@observable sysOperationLogData: any[] = []*/

  constructor(private connectionService: ConnectionService) {
  }

  /**获取操作日志：get**/
  reloadPaylogsData(params) {
    const path = '/operationLogs'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      // console.log('获取直销部门列表', page.data.msg, page.data.status)
      if (page.data.result === '0') {
        //if (page.data.permission === 0) {/*请求数据"成功"*/
          /*this.sysOperationLogData.length = 0
          this.sysOperationLogData.push(...page.data.list)*/
        //}
      } else {
        this.connectionService.isLoginByResult(page.data.description, '操作日志')
      }
    }, err => {
      appAlert.common.actionFailed('请求"操作日志"')
    })
    return configsObservable
  }
    /**删除配置时调此接口进行操作日志记录：post**/
    deleteCostSettingLog(data) {
        const path = '/operation/deleteCost'
        this.connectionService.post(path, data)
    }
}
