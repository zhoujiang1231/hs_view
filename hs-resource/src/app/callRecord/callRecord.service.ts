import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import {ConnectionService} from '../core/services/connection.service'
import appAlert from '../utils/alert'

@Injectable()
export class CallRecordsService {
  /*@observable callRecords: any[] = []
  @observable callRecordsCdrObTotal: any = {billDurationsTotal:0,bridgeDurationsTotal:0}
*/
  constructor(private connectionService: ConnectionService) {}

  /**请求 通话记录**/
  reloadcallRecords(params) {
    const path = '/callRecords'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      if (page.data.result === '0') {
        // if (page.data.permission === 0) {/*请求数据"成功"*/
          /*this.callRecords.length = 0
          this.callRecords.push(...page.data.list)
          this.callRecordsCdrObTotal = {...page.data.data}*/
        // }
      } else {
        this.connectionService.isLoginByResult(page.data.description, '通话记录')
      }
    }, err => {
      appAlert.common.actionFailed('请求"通话记录失败"')
    })
    return configsObservable
  }

    /**导出话单**/
    exportCallrecord(params) {
        const path = '/callRecord/files'
        const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
        configsObservable.subscribe((page: any) => {
            if (page.data.result === '0') {
            } else {
                this.connectionService.isLoginByResult(page.data.description, '导出话单')
            }
        }, err => {
            appAlert.common.actionFailed('导出话单失败')
        })
        return configsObservable
    }
}
