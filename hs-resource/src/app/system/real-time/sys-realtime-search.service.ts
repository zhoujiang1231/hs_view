import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {ConnectionService} from '../../core/services/connection.service'
import {Observable} from 'rxjs/Observable'
import appAlert from '../../utils/alert'

@Injectable()
export class SysTimeSearchService {
  @observable sysTimeSearchData: any[] = []
  @observable sysSearchProduct: any[] = []
  @observable sysSearchDomain: any[] = []
  @observable sysSearchService: any[] = []
  @observable sysSearchTrunkgroup: any[] = []
  @observable sysSearchGateway: any[] = []

  constructor(private connectionService: ConnectionService) {}

  /**获取系统统计列表：get**/
  reloadSysTimeSearch(params) {
    const path = '/api/statistic/system'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      console.log('获取系统统计列表', page.data.msg, page.data.status)
      if (page.data.status === 0) {/*请求数据"成功"*/
        this.sysTimeSearchData.length = 0
        this.sysTimeSearchData.push(...page.data.result)
      } else {
        this.connectionService.isLoginByResult(page.data.msg, '系统统计列表')
      }
    }, err => {
      appAlert.common.actionFailed('请求"系统统计列表"')
    })
    return configsObservable
  }

  /**获取 产品统计列表：get**/
  reloadSearchProduct(params) {
    const path = '/api/statistic/product'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      console.log('获取产品统计列表', page.data.msg, page.data.status)
      if (page.data.status === 0) {/*请求数据"成功"*/
        this.sysSearchProduct.length = 0
        this.sysSearchProduct.push(...page.data.result)
      } else {
        this.connectionService.isLoginByResult(page.data.msg, '产品统计列表')
      }
    }, err => {
      appAlert.common.actionFailed('请求"产品统计列表"')
    })
    return configsObservable
  }

  /**获取 平台统计列表：get**/
  reloadSearchDomain(params) {
    const path = '/api/statistic/domain'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      console.log('获取平台统计列表', page.data.msg, page.data.status)
      if (page.data.status === 0) {/*请求数据"成功"*/
        this.sysSearchDomain.length = 0
        this.sysSearchDomain.push(...page.data.result)
      } else {
        this.connectionService.isLoginByResult(page.data.msg, '平台统计列表')
      }
    }, err => {
      appAlert.common.actionFailed('请求"平台统计列表"')
    })
    return configsObservable
  }

  /**获取 业务统计列表：get**/
  reloadSearchService(params) {
    const path = '/api/statistic/service'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      console.log('获取业务统计列表', page.data.msg, page.data.status)
      if (page.data.status === 0) {/*请求数据"成功"*/
        this.sysSearchService.length = 0
        this.sysSearchService.push(...page.data.result)
      } else {
        this.connectionService.isLoginByResult(page.data.msg, '业务统计列表')
      }
    }, err => {
      appAlert.common.actionFailed('请求"业务统计列表"')
    })
    return configsObservable
  }

  /**获取 中继组统计列表：get**/
  reloadSearchTrunkgroup(params) {
    const path = '/api/statistic/trunkgroup'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      console.log('获取中继组统计列表', page.data.msg, page.data.status)
      if (page.data.status === 0) {/*请求数据"成功"*/
        this.sysSearchTrunkgroup.length = 0
        this.sysSearchTrunkgroup.push(...page.data.result)
      } else {
        this.connectionService.isLoginByResult(page.data.msg, '中继组统计列表')
      }
    }, err => {
      appAlert.common.actionFailed('请求"中继组统计列表"')
    })
    return configsObservable
  }

  /**获取 网关统计列表：get**/
  reloadSearchGateway(params) {
    const path = '/api/statistic/gateway'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      console.log('获取网关统计列表', page.data.msg, page.data.status)
      if (page.data.status === 0) {/*请求数据"成功"*/
        this.sysSearchGateway.length = 0
        this.sysSearchGateway.push(...page.data.result)
      } else {
        this.connectionService.isLoginByResult(page.data.msg, '网关统计列表')
      }
    }, err => {
      appAlert.common.actionFailed('请求"网关统计列表"')
    })
    return configsObservable
  }
}
