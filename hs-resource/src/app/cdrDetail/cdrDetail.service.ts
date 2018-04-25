import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import {ConnectionService} from '../core/services/connection.service'
import appAlert from '../utils/alert'

@Injectable()
export class CdrDetailService {
  @observable cdrDetailCdrIb: any[] = [] /*呼入详情数据*/
  @observable cdrDetailCdrOb: any[] = [] /*呼出详情数据*/

  constructor(private connectionService: ConnectionService) {}

  /**请求 呼入详情记录**/
  reloadCdrIb(params) {
    const path = '/cdrDetail/cdrIb'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      if (page.data.result === '0') {
        // if (page.data.permission === 0) {/*请求数据"成功"*/
          this.cdrDetailCdrIb.length = 0
          this.cdrDetailCdrIb.push(...page.data.list)
        // }
      } else {
        this.connectionService.isLoginByResult(page.data.description, '呼入详情')
      }
    }, err => {
      appAlert.common.actionFailed('请求"呼入详情"')
    })
    return configsObservable
  }

    /**请求 外呼详情记录**/
    reloadCdrOb(params) {
        const path = '/cdrDetail/cdrOb'
        const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
        configsObservable.subscribe((page: any) => {
            if (page.data.result === '0') {
                // if (page.data.permission === 0) {/*请求数据"成功"*/
                this.cdrDetailCdrIb.length = 0
                this.cdrDetailCdrIb.push(...page.data.list)
                // }
            } else {
                this.connectionService.isLoginByResult(page.data.description, '外呼详情')
            }
        }, err => {
            appAlert.common.actionFailed('请求"外呼详情"')
        })
        return configsObservable
    }
}
