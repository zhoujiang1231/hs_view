import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import {ConnectionService} from '../../core/services/connection.service'
import appAlert from '../../utils/alert'

@Injectable()
export class SysTimeListService {
  @observable sysTimeListData: any[] = []

  constructor(private connectionService: ConnectionService) {}

  /**新增实时统计：post**/
  addSysTimeList(data, dialogRef, disabled?) {
    const path = '/api/system/statistics'
    this.connectionService.post(path, data)
      .then(res => {
        // console.log('新增实时统计组', res)
        if (res.data.status === 0) {
          dialogRef.close('success')
          appAlert.common.actionSuccess('新增实时统计组')
        } else {
          if (disabled) {disabled.value = false}
          console.log(res.data.msg)
          appAlert.common.actionFailed('新增实时统计组')
        }
      }).catch(err => {
      if (disabled) {disabled.value = false}
      appAlert.common.actionFailed('新增实时统计组')
    })
  }

  /**删除实时统计：delete**/
  deleteSysTimeList(id) {
    const path = '/api/system/statistics/' + id
    const configsObservable = Observable.fromPromise(this.connectionService.delete(path))
    configsObservable.subscribe(res => {
        if (res.data.status === 0) {
          appAlert.common.actionSuccess('删除实时统计')
        } else {
          console.log(res.data.msg)
          appAlert.common.actionFailed('删除实时统计')
        }
      }, err => {
      appAlert.common.actionFailed('删除实时统计')
    })
    return configsObservable
  }

  /**修改实时统计：put**/
  operateSysTimeList(data, dialogRef, disabled?) {
    const path = '/api/system/statistics'
    this.connectionService.put(path, data)
      .then(res => {
        // console.log('修改实时统计组', res)
        if (res.data.status === 0) {
          dialogRef.close('success')
          appAlert.common.actionSuccess('修改实时统计组')
        } else {
          if (disabled) {disabled.value = false}
          console.log(res.data.msg)
          appAlert.common.actionFailed('修改实时统计组')
        }
      }).catch(err => {
      if (disabled) {disabled.value = false}
      appAlert.common.actionFailed('修改实时统计组')
    })
  }

  /**获取实时统计列表：get**/
  reloadSysTimeList(params) {
    const path = '/api/system/statistics'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      console.log('获取实时统计列表', page.data.msg, page.data.status)
      if (page.data.status === 0) {/*请求数据"成功"*/
        this.sysTimeListData.length = 0
        this.sysTimeListData.push(...page.data.result)
      } else {
        this.connectionService.isLoginByResult(page.data.msg, '实时统计列表')
      }
    }, err => {
      appAlert.common.actionFailed('请求"实时统计列表"')
    })
    return configsObservable
  }
}
