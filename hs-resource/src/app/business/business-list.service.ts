import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {ConnectionService} from '../core/services/connection.service'
import appAlert from '../utils/alert'
import {Observable} from 'rxjs/Rx'

@Injectable()
export class BusinessListService {
  @observable businessList: any[] = []

  constructor(private connectionService: ConnectionService) {}

  /**
   * @desc 获取业务列表：get请求
   * @param params - 查询条件
   */
  reloadBusinessList(params) {
    const path = '/api/serviceManage/services'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      console.log('获取业务列表', page.data.msg, page.data.status)
      if (page.data.status === 0) {
        if (page.data.permission === 0) {/*请求数据"成功"*/
          this.businessList.length = 0
          this.businessList.push(...page.data.result)
        }
      } else {
        this.connectionService.isLoginByResult(page.data.msg, '业务列表')
      }
    }, err => {
      appAlert.common.actionFailed('请求"业务列表"')
    })
    return configsObservable
  }

  /**新增业务：post**/
  addBusinessList(data) {
    const path = '/api/serviceManage/services'
    return this.connectionService.post(path, data)
  }

  /**修改业务put**/
  operateBusinessList(data) {
    const path = '/api/serviceManage/services'
    return this.connectionService.put(path, data)
  }

  /**删除业务：delete**/
  deleteBusinessList(id) {
    const path = '/api/serviceManage/services/' + id
    return this.connectionService.delete(path)
  }
}
