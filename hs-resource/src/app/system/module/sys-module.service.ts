import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import {ConnectionService} from '../../core/services/connection.service'
import appAlert from '../../utils/alert'

@Injectable()
export class SysModuleService {
  @observable sysModuleData: any[] = []

  constructor(private connectionService: ConnectionService) {}

  /**获取模块列表：get**/
  reloadSysModule(params) {
    const path = '/api/system/modules'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      console.log('获取模块列表', page.data.msg, page.data.status)
      if (page.data.status === 0) {
        if (page.data.permission === 0) {/*请求数据"成功"*/
          this.sysModuleData.length = 0
          this.sysModuleData.push(...page.data.result)
        }
      } else {
        this.connectionService.isLoginByResult(page.data.msg, '模块列表')
      }
    }, err => {
      appAlert.common.actionFailed('请求"模块列表"')
    })
    return configsObservable
  }
}
