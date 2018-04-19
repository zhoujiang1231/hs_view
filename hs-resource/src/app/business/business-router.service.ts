import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import {ConnectionService} from '../core/services/connection.service'
import appAlert from '../utils/alert'

@Injectable()
export class BusinessRouterService {
  @observable businessRouter: any[] = []
  @observable routerAction: any[] = []

  constructor(private connectionService: ConnectionService) {}

  /**
   * @desc 获取路由列表：get请求
   * @param params - 查询条件
   */
  reloadBusinessRouter(params) {
    const path = '/api/serviceManage/routers'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      console.log('获取路由列表', page.data.msg, page.data.status)
      if (page.data.status === 0) {
        if (page.data.permission === 0) {/*请求数据"成功"*/
          this.businessRouter.length = 0
          this.businessRouter.push(...page.data.result)
        }
      } else {
        this.connectionService.isLoginByResult(page.data.msg, '路由列表')
      }
    }, err => {
      appAlert.common.actionFailed('请求"路由列表"')
    })
    return configsObservable
  }

  /**修改路由put**/
  operateBusinessRouter(data) {
    const path = '/api/serviceManage/routers'
    return this.connectionService.put(path, data)
  }

  /**新增路由post*/
  addBusinessRouter(data) {
    const path = '/api/serviceManage/routers'
    return this.connectionService.post(path, data)
  }

  /**删除路由：delete**/
  deleteBusinessRouter(id) {
    const path = '/api/serviceManage/routers/' + id
    return this.connectionService.delete(path)
  }

  /**获取路由action列表 get请求**/
  reloadRouterAction(params) {
    const path = '/api/serviceManage/actions'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      console.log('获取路由action列表', page.data.msg, page.data.status)
      if (page.data.status === 0) {/*请求数据"成功"*/
        this.routerAction.length = 0
        this.routerAction.push(...page.data.result)
      } else {
        appAlert.common.actionFailed('请求"路由action列表"')
      }
    }, err => {
      console.log('请求"路由action列表"', err)
      appAlert.common.actionFailed('请求"路由action列表"')
    })
    return configsObservable
  }

  /**更新路由action:put**/
  updateRouterAction(data, dialogRef?: any, disabled?) {// {routerId: ,actions:{}}
    const path = '/api/serviceManage/actions'
    const configsObservable = Observable.fromPromise(this.connectionService.put(path, data))
    configsObservable.subscribe(res => {
        console.log('更新路由Action', res)
        if (res.data.status === 0) {
          if (dialogRef) {
            dialogRef.close('success')
          }
          appAlert.common.actionSuccess('更新路由Action')
        } else {
          if (disabled) {disabled.value = false}
          appAlert.common.actionFailed('更新路由Action')
        }
      }, err => {
      if (disabled) {disabled.value = false}
      appAlert.common.actionFailed('更新路由Action')
    })

    return configsObservable
  }
}
