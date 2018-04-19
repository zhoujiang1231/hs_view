import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import {ConnectionService} from '../core/services/connection.service'
import appAlert from '../utils/alert'

@Injectable()
export class DockGroupService {
  @observable dockGroupData: any[] = []
  @observable deployGateway: any[] = []

  constructor(private connectionService: ConnectionService) {}

  /**新增中继组：post**/
  addDockGroup(data) {
    const path = '/api/system/trunkGroups'
    return this.connectionService.post(path, data)
  }

  /**删除中继组：delete**/
  deleteDockGroup(id) {
    const path = '/api/system/trunkGroups/' + id
    const configsObservable = Observable.fromPromise(this.connectionService.delete(path))
    configsObservable.subscribe(res => {
        console.log('删除中继组', res)
        if (res.data.status === 0) {
          appAlert.common.actionSuccess('删除中继组')
        } else {
          appAlert.common.actionFailed(res.data.msg)
        }
      }, err => {
      appAlert.common.actionFailed('删除中继组')
    })
    return configsObservable
  }

  /**修改中继组：put**/
  operateDockGroup(data) {
    const path = '/api/system/trunkGroups'
    return this.connectionService.put(path, data)
  }

  /**获取中继组列表：get**/
  reloadDockGroup(params) {
    const path = '/api/system/trunkGroups'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      console.log('获取中继组列表', page.data.msg, page.data.status)
      if (page.data.status === 0) {
        if (page.data.permission === 0) {/*请求数据"成功"*/
          this.dockGroupData.length = 0
          this.dockGroupData.push(...page.data.result)
        }
      } else {
        this.connectionService.isLoginByResult(page.data.msg, '对接中继组列表')
      }
    }, err => {
      appAlert.common.actionFailed('请求"对接中继组列表"')
    })
    return configsObservable
  }

  /**中继组新增网关：post**/
  addNetFromDockGroup(data) {
    const path = '/api/system/trunkGroup/gateways'
    return this.connectionService.post(path, data)
  }

  /**中继组编辑网关：put**/
  editNetFromDockGroup(data) {
    const path = '/api/system/trunkGroup/gateways'
    return this.connectionService.put(path, data)
  }

  /**中继组删除网关：delete**/
  deleteNetFromDockGroup(gatewayId, trunkGroupId) {
    const path = '/api/system/trunkGroup/gateways'
    const _data = {
      gatewayId: gatewayId,
      trunkGroupId: trunkGroupId,
    }
    const configsObservable = Observable.fromPromise(this.connectionService.delete(path, {params: _data}))
    configsObservable.subscribe(res => {
        if (res.data.status === 0) {
          appAlert.common.actionSuccess('中继组删除网关')
        } else {
          console.log(res.data.msg)
          appAlert.common.actionFailed('中继组删除网关')
        }
      }, err => {
      appAlert.common.actionFailed('中继组删除网关')
    })
    return configsObservable
  }

  /**查询中继组下所有网关列表：get**/
  reloadDeployNetList(params) {
    const path = '/api/system/trunkGroup/gateways'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      console.log('获取中继组下所有网关列表', page.data.msg, page.data.status)
      if (page.data.status === 0) {/*请求数据"成功"*/
        this.deployGateway.length = 0
        this.deployGateway.push(...page.data.result)
      } else {
        this.connectionService.isLoginByResult(page.data.msg, '中继组下所有网关列表')
      }
    }, err => {
      appAlert.common.actionFailed('请求"中继组下所有网关列表"')
    })
    return configsObservable
  }
}
