import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {ConnectionService} from '../core/services/connection.service'
import {Observable} from 'rxjs/Observable'
import appAlert from '../utils/alert'

@Injectable()
export class NumbersService {
  @observable phoneNumberData: any[] = []

  constructor(private connectionService: ConnectionService) {}

  /**获取话单列表：get**/
  reloadNumbers(params) {
    const path = '/api/numbers'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      console.log('获取号码列表', page.data.msg, page.data.status)
      if (page.data.status === 0) {/*请求数据"成功"*/
        this.phoneNumberData = page.data.result
      } else {
        this.connectionService.isLoginByResult(page.data.msg, '号码列表')
      }
    }, err => {
      appAlert.common.actionFailed('请求"号码列表"')
    })
    return configsObservable
  }

  /**
   * 初始化数据、初始化缓存
   * @param path - 接口路径
   * @param str - 数据/缓存
   */
  init(path, str) {
    this.connectionService.post(path)
      .then(res => {
        console.log(`初始化${str}`, res)
        if (res.data.status === 0) {
          appAlert.login.success(res.data.result)
        } else {
          appAlert.common.confirmWarning(res.data.result)
        }
      })
      .catch(err => {
        appAlert.common.actionFailed(`初始化${str}`)
      })
  }

  /**
   * 查询redis中的值
   * @param params
   * @returns {AxiosPromise<any>}
   */
  reloadRedis(params) {
    const path = '/api/redisval'
    return this.connectionService.get(path, {params: params})
  }

  /**
   * 根据号码查询redis中的值
   * @param params
   * @returns {AxiosPromise<any>}
   */
  reloadRedisByNum(params) {
    const path = '/api/redisvalbynum'
    return this.connectionService.get(path, {params: params})
  }
}
