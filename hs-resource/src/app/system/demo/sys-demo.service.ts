import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import appAlert from '../../utils/alert'
import {ConnectionService} from '../../core/services/connection.service'

@Injectable()
export class SysDemoService {
  @observable sysDemoData: any[] = []

  constructor(private connectionService: ConnectionService) {}

  /**获取实例列表:get**/
  reloadSysDemo(params) {
    const path = '/api/system/instances'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      console.log('获取实例列表', page.data.msg, page.data.status)
      if (page.data.status === 0) {
        if (page.data.permission === 0) {/*请求数据"成功"*/
          this.sysDemoData.length = 0
          this.sysDemoData.push(...page.data.result)
        }
      } else {
        this.connectionService.isLoginByResult(page.data.msg, '实例列表')
      }
    }, err => {
      appAlert.common.actionFailed('请求"实例列表"')
    })
    return configsObservable
  }

  /**修改实例：put**/
  operateSysDemo(data) {
    const path = '/api/system/instances'
    return this.connectionService.put(path, data)
  }

  /**删除实例：delete**/
  deleteSysDemo(id) {
    const path = '/api/system/instances/' + id
    const configsObservable = Observable.fromPromise(this.connectionService.delete(path))
    configsObservable.subscribe(res => {
        if (res.data.status === 0) {
          appAlert.common.actionSuccess('删除实例')
        } else {
          console.log(res.data.msg)
          appAlert.common.actionFailed('删除实例')
        }
      }, err => {
      appAlert.common.actionFailed('删除实例')
    })
    return configsObservable
  }

  /**新增实例：post**/
  addSysDemo(data) {
    const path = '/api/system/instances'
    return this.connectionService.post(path, data)
  }
}
