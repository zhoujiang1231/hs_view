import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import {ConnectionService} from '../core/services/connection.service'
import appAlert from '../utils/alert'

@Injectable()
export class DockNetService {
  @observable dockNetData: any[] = []

  constructor(private connectionService: ConnectionService) {
  }

  /**新增网关：post**/
  addDockNet(data) {
    const path = '/api/system/gateways'
    return this.connectionService.post(path, data)
  }

  /**删除网关：delete**/
  deleteDockNet(id) {
    const path = '/api/system/gateways/' + id
    const configsObservable = Observable.fromPromise(this.connectionService.delete(path))
    configsObservable.subscribe(res => {
        if (res.data.status === 0) {
          appAlert.common.actionSuccess('删除网关')
        } else {
          console.log(res.data.msg)
          appAlert.common.actionFailed('删除网关')
        }
      }, err => {
      appAlert.common.actionFailed('删除网关')
    })
    return configsObservable
  }

  /**修改网关：put**/
  operateDockNet(data) {
    const path = '/api/system/gateways'
    return this.connectionService.put(path, data)
  }

  /**获取网关列表：get**/
  reloadDockNet(params) {
    const path = '/api/system/gateways'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      console.log('获取网关列表', page.data.msg, page.data.status)
      if (page.data.status === 0) {
        if (page.data.permission === 0) {/*请求数据"成功"*/
          this.dockNetData.length = 0
          this.dockNetData.push(...page.data.result)
        }
      } else {
        this.connectionService.isLoginByResult(page.data.msg, '网关列表')
      }
    }, err => {
      appAlert.common.actionFailed('请求"网关列表"')
    })
    return configsObservable
  }
}
