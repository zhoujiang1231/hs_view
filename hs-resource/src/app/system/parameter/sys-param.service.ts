import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import {ConnectionService} from '../../core/services/connection.service'
import appAlert from '../../utils/alert'

@Injectable()
export class SysParameterService {
  @observable sysParameterData: any[] = []

  constructor(private connectionService: ConnectionService) {}

  /**修改参数设置：put**/
  operateSysParameter(data) {
    const path = '/api/system/settings'
    this.connectionService.put(path, data)
      .then(res => {
        if (res.data.status === 0) {
          appAlert.common.actionSuccess('请求"参数设置列表"')
        } else {
          console.log(res.data.msg)
          appAlert.common.actionFailed('请求"参数设置列表"')
        }
      }).catch(err => {
      appAlert.common.actionFailed('请求"参数设置列表"')
    })
  }

  /**获取参数设置列表：get**/
  reloadSysParameter(params) {
    const path = '/api/system/systemSettings'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      console.log('获取参数设置列表', page.data.msg, page.data.status)
      if (page.data.status === 0) {
        if (page.data.permission === 0) {/*请求数据"成功"*/
          this.sysParameterData.length = 0
          this.sysParameterData.push(...page.data.result)
        }
      } else {
        this.connectionService.isLoginByResult(page.data.msg, '参数设置列表')
      }
    }, err => {
      appAlert.common.actionFailed('请求"参数设置列表"')
    })
    return configsObservable
  }
}
