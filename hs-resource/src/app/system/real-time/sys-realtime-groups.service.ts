import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import {ConnectionService} from '../../core/services/connection.service'
import appAlert from '../../utils/alert'

@Injectable()
export class SysTimeGroupService {
  @observable sysTimeGroupData: any[] = [
    // {
    //   'id': '1',
    //   'name': 'statistic_group_001',
    //   'description': '实时统计组001',
    //   'createTime': '2017-10-20 09:20:12'
    // }
  ]

  constructor(private connectionService: ConnectionService) {}

  /**新增实时统计组：post**/
  addSysTimeGroup(data, dialogRef, disabled?) {
    const path = '/api/system/statistic/statisticGroups'
    this.connectionService.post(path, data)
      .then(res => {
        console.log('新增实时统计组', res)
        if (res.data.status === 0) {
          dialogRef.close('success')
          appAlert.common.actionSuccess('新增实时统计组')
        } else {
          if (disabled) {disabled.value = false}
          appAlert.common.actionFailed('新增实时统计组')
        }
      }).catch(err => {
      if (disabled) {disabled.value = false}
      console.log('新增实时统计组err', err)
      appAlert.common.actionFailed('新增实时统计组')
    })
  }

  /**删除实时统计组：delete**/
  deleteSysTimeGroup(id) {
    const path = '/api/system/statistic/statisticGroups/' + id
    const configsObservable = Observable.fromPromise(this.connectionService.delete(path))
    configsObservable.subscribe(res => {
        if (res.data.status === 0) {
          appAlert.common.actionSuccess('删除实时统计组')
        } else {
          console.log('删除实时统计组', res.data.msg)
          appAlert.common.actionFailed('删除实时统计组')
        }
      }, err => {
      console.log('删除实时统计组err', err)
      appAlert.common.actionFailed('删除实时统计组')
    })
    return configsObservable
  }

  /**修改实时统计组：put**/
  operateSysTimeGroup(data, dialogRef, disabled?) {
    const path = '/api/system/statistic/statisticGroups'
    this.connectionService.put(path, data)
      .then(res => {
        // console.log('修改实时统计组', res)
        if (res.data.status === 0) {
          dialogRef.close('success')
          appAlert.common.actionSuccess('修改实时统计组')
        } else {
          if (disabled) {disabled.value = false}
          appAlert.common.actionFailed('修改实时统计组')
        }
      }).catch(err => {
      if (disabled) {disabled.value = false}
      appAlert.common.actionFailed('修改实时统计组')
    })
  }

  /**获取实时统计组列表：get**/
  reloadSysTimeGroup(params) {
    const path = '/api/system/statistic/statisticGroups'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      console.log('获取实时统计组列表', page.data.msg, page.data.status)
      if (page.data.status === 0) {
        if (page.data.permission === 0) {/*请求数据"成功"*/
          this.sysTimeGroupData.length = 0
          this.sysTimeGroupData.push(...page.data.result)
        }
      } else {
        this.connectionService.isLoginByResult(page.data.msg, '实时统计组')
      }
    }, err => {
      appAlert.common.actionFailed('请求"实时统计组"')
    })
    return configsObservable
  }
}
