import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import appAlert from '../../utils/alert'
import {ConnectionService} from '../../core/services/connection.service'

@Injectable()
export class SysPlatformService {
  @observable sysPlatformData: any[] = []

  constructor(private connectionService: ConnectionService) {}

  /**新增平台：post**/
  addSysPlatform(data, dialogRef, disabled?) {
    const path = '/api/system/domains'
    this.connectionService.post(path, data)
      .then(res => {
        // console.log('新增平台', res)
        if (res.data.status === 0) {
          dialogRef.close('success')
          appAlert.common.actionSuccess('新增平台')
        } else {
          if (disabled) {disabled.value = false}
          console.log(res.data.msg)
          appAlert.common.actionFailed('新增平台')
        }
      }).catch(err => {
      if (disabled) {disabled.value = false}
      appAlert.common.actionFailed('新增平台')
    })
  }

  /**删除平台：delete**/
  deleteSysPlatform(id) {
    const path = '/api/system/domains/' + id
    const configsObservable = Observable.fromPromise(this.connectionService.delete(path))
    configsObservable.subscribe(res => {
        if (res.data.status === 0) {
          appAlert.common.actionSuccess('删除平台')
        } else {
          console.log(res.data.msg)
          appAlert.common.actionFailed('删除平台')
        }
      }, err => {
      appAlert.common.actionFailed('删除平台')
    })
    return configsObservable
  }

  /**修改平台：put**/
  operateSysPlatform(data, dialogRef, disabled?) {
    const path = '/api/system/domains'
    this.connectionService.put(path, data)
      .then(res => {
        // console.log('修改平台', res)
        if (res.data.status === 0) {
          dialogRef.close('success')
          appAlert.common.actionSuccess('修改平台')
        } else {
          if (disabled) {disabled.value = false}
          console.log(res.data.msg)
          appAlert.common.actionFailed('修改平台')
        }
      }).catch(err => {
      if (disabled) {disabled.value = false}
      appAlert.common.actionFailed('修改平台')
    })
  }

  /**获取平台列表：get**/
  reloadSysPlatform(params) {
    const path = '/api/system/domains'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      console.log('获取平台列表', page.data.msg, page.data.status)
      if (page.data.status === 0) {
        if (page.data.permission === 0) {/*请求数据"成功"*/
          this.sysPlatformData.length = 0
          this.sysPlatformData.push(...page.data.result)
        }
      } else {
        this.connectionService.isLoginByResult(page.data.msg, '平台列表')
      }
    }, err => {
      appAlert.common.actionFailed('请求"平台列表"')
    })
    return configsObservable
  }
}
