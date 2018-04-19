import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import {ConnectionService} from '../core/services/connection.service'
import appAlert from '../utils/alert'
import {Router} from '@angular/router'

@Injectable()
export class AlertInfoOperateService {
  @observable alertInfo: any[] = []

  constructor(private connectionService: ConnectionService,
              private router: Router) {
  }

  /**
   * @desc 根据查询条件获取配置
   * @param params - 查询条件
   */
  reloadRepOperate(params) {
    const path = '/api/alerts'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      console.log('告警信息', page.data.msg, page.data.status)
      if (page.data.status === 0) {/*请求数据"成功"*/
        this.alertInfo.length = 0
        this.alertInfo.push(...page.data.result)
      } else {
        if (page.data.msg.includes('未登录')) {
          this.connectionService.logout()
          this.router.navigate(['/signin'])
          localStorage.clear()
        } else {
          appAlert.common.actionFailed('请求"告警信息列表"')
        }
      }
    }, err => {
      appAlert.common.actionFailed('请求"告警信息列表"')
    })
    return configsObservable
  }

  /**处理告警信息：put请求**/
  operateAlertInfo(id) {
    const _data = {id: id}
    const path = '/api/alerts/' + id
    this.connectionService.put(path, _data)
      .then(res => {
        console.log('处理告警信息', res)
        if (res.data.status === 0) {
          appAlert.common.actionSuccess('处理告警信息')
        } else {
          console.log(res.data.msg)
          appAlert.common.actionFailed('处理告警信息')
        }
      }).catch(err => {
      appAlert.common.actionFailed('处理告警信息')
    })
  }

  /**新增告警信息：post请求**/
  addAlertInfo(data) {
    const path = '/api/alerts'
    this.connectionService.post(path, data)
      .then(res => {
        console.log('新增告警信息', res)
        if (res.data.status === 0) {
          this.alertInfo.unshift(data)
          appAlert.common.actionSuccess('新增告警信息')
        } else {
          console.log(res.data.msg)
          appAlert.common.actionFailed('新增告警信息')
        }
      }).catch(err => {
      appAlert.common.actionFailed('新增告警信息')
    })
  }
}
