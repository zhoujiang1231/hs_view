import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import {ConnectionService} from '../../core/services/connection.service'
import appAlert from '../../utils/alert'

@Injectable()
export class SysAclService {
  @observable sysAclData: any[] = []

  constructor(private connectionService: ConnectionService) {}

  /**新增白名单：post**/
  addSysAcl(data, dialogRef, disabled?) {
    const path = '/api/system/acls'
    this.connectionService.post(path, data)
      .then(res => {
        console.log('新增白名单', res)
        if (res.data.status === 0) {
          dialogRef.close('success')
          appAlert.common.actionSuccess('新增白名单')
        } else {
          if (disabled) {disabled.value = false}
          console.log(res.data.msg)
          appAlert.common.actionFailed('新增白名单')
        }
      }).catch(err => {
      if (disabled) {disabled.value = false}
      appAlert.common.actionFailed('新增白名单')
    })
  }

  /**删除白名单：delete**/
  deleteSysAcl(id) {
    const path = '/api/system/acls/' + id
    const configsObservable = Observable.fromPromise(this.connectionService.delete(path))
    configsObservable.subscribe(res => {
        if (res.data.status === 0) {
          appAlert.common.actionSuccess('删除白名单')
        } else {
          console.log(res.data.msg)
          appAlert.common.actionFailed('删除白名单')
        }
      }, err => {
      appAlert.common.actionFailed('删除白名单')
    })
    return configsObservable
  }

  /**获取白名单列表：get**/
  reloadSysAcl(params) {
    const path = '/api/system/acls'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      console.log('获取白名单列表', page.data.msg, page.data.status)
      if (page.data.status === 0) {
        if (page.data.permission === 0) {/*请求数据"成功"*/
          this.sysAclData.length = 0
          this.sysAclData.push(...page.data.result)
        }
      } else {
        this.connectionService.isLoginByResult(page.data.msg, '白名单列表')
      }
    }, err => {
      appAlert.common.actionFailed('获取白名单列表')
    })
    return configsObservable
  }
}
