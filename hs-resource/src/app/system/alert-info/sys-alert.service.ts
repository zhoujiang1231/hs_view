import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import {ConnectionService} from '../../core/services/connection.service'
import appAlert from '../../utils/alert'

@Injectable()
export class SysAlertService {
  @observable sysAlertData: any[] = []

  constructor(private connectionService: ConnectionService) {
  }

  /**新增告警设置：post**/
  addSysAlert(data, dialogRef, disabled?) {
    const path = '/api/system/alertSettings'
    this.connectionService.post(path, data)
      .then(res => {
        console.log('新增告警设置', res)
        if (res.data.status === 0) {
          dialogRef.close('success')
          appAlert.common.actionSuccess('新增告警设置')
        } else {
          if (disabled) {disabled.value = false}
          console.log(res.data.msg)
          appAlert.common.actionFailed('新增告警设置')
        }
      }).catch(err => {
      if (disabled) {disabled.value = false}
      appAlert.common.actionFailed('新增告警设置')
    })
  }

  /**删除告警设置：delete**/
  deleteSysAlert(id) {
    const path = '/api/system/alertSettings/' + id
    const configsObservable = Observable.fromPromise(this.connectionService.delete(path))
    configsObservable.subscribe(res => {
        if (res.data.status === 0) {
          appAlert.common.actionSuccess('删除告警设置')
        } else {
          console.log(res.data.msg)
          appAlert.common.actionFailed('删除告警设置')
        }
      }, err => {
      appAlert.common.actionFailed('删除告警设置')
    })
    return configsObservable
  }

  /**修改告警设置：put**/
  operateSysAlert(data, dialogRef, disabled?) {
    const path = '/api/system/alertSettings'
    this.connectionService.put(path, data)
      .then(res => {
        console.log('修改告警设置', res)
        if (res.data.status === 0) {
          dialogRef.close('success')
          appAlert.common.actionSuccess('修改告警设置')
        } else {
          if (disabled) {disabled.value = false}
          console.log(res.data.msg)
          appAlert.common.actionFailed('修改告警设置')
        }
      }).catch(err => {
      if (disabled) {disabled.value = false}
      appAlert.common.actionFailed('修改告警设置')
    })
  }

  /**获取告警设置列表：get**/
  reloadSysAlert(params) {
    const path = '/api/system/alertSettings'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      console.log('获取告警设置列表', page.data.msg, page.data.status)
      if (page.data.status === 0) {
        if (page.data.permission === 0) {/*请求数据"成功"*/
          this.sysAlertData.length = 0
          this.sysAlertData.push(...page.data.result)
        }
      } else {
        this.connectionService.isLoginByResult(page.data.msg, '告警设置列表')
      }
    }, err => {
      appAlert.common.actionFailed('请求"告警设置列表"')
    })
    return configsObservable
  }
}
