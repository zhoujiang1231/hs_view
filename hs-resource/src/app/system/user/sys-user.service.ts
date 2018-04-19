import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import {ConnectionService} from '../../core/services/connection.service'
import appAlert from '../../utils/alert'

@Injectable()
export class SysUserService {
  @observable sysUserData: any[] = []

  constructor(private connectionService: ConnectionService) {}

  /**新增用户：post**/
  addSysUser(data, dialogRef, disabled?) {
    const path = '/api/system/users'
    this.connectionService.post(path, data)
      .then(res => {
        console.log('新增用户', res)
        if (res.data.status === 0) {
          if (res.data.permission === 0) {
            dialogRef.close('success')
            appAlert.common.actionSuccess('新增用户')
          } else if (res.data.permission === -1) {
            disabled.value = false
            appAlert.common.confirmWarning('很抱歉，您没有新增用户的权限！')
          }
        } else {
          console.log(res.data.msg)
          disabled.value = false
          appAlert.common.actionFailed('新增用户')
        }
      }).catch(err => {
      disabled.value = false
      appAlert.common.actionFailed('新增用户')
    })
  }

  /**删除用户：delete**/
  deleteSysUser(id) {
    const path = '/api/system/users/' + id
    const configsObservable = Observable.fromPromise(this.connectionService.delete(path))
    configsObservable.subscribe(res => {
        if (res.data.status === 0) {
          if (res.data.permission === 0) {
            appAlert.common.actionSuccess('删除用户')
          } else if (res.data.permission === -1) {
            appAlert.common.confirmWarning('很抱歉，您没有删除该用户的权限！')
          }
        } else {
          console.log(res.data.msg)
          appAlert.common.actionFailed('删除用户')
        }
      }, err => {
      appAlert.common.actionFailed('删除用户')
    })
    return configsObservable
  }

  /**修改用户\修改密码：put**/
  operateSysUser(path, data, dialogRef?: any, disabled?: any) {
    this.connectionService.put(path, data)
      .then(res => {
        console.log('修改', res)
        if (res.data.status === 0) {
          if (res.data.permission === 0) {
            if (dialogRef) {
              dialogRef.close('success')
            }
            appAlert.common.actionSuccess('修改')
          } else if (res.data.permission === -1) {
            if (disabled) {disabled.value = false}
            appAlert.common.confirmWarning('很抱歉，您没有编辑该用户信息的权限！')
          }
        } else {
          if (disabled) {disabled.value = false}
          console.log(res.data.msg)
          appAlert.common.actionFailed('修改')
        }
      }).catch(err => {
      if (disabled) {disabled.value = false}
      appAlert.common.actionFailed('修改')
    })
  }

  /**获取用户列表：get**/
  reloadSysUser(params) {
    const path = '/api/system/users'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      console.log('获取用户列表', page.data.msg, page.data.status)
      if (page.data.status === 0) {
        if (page.data.permission === 0) {/*请求数据"成功"*/
          this.sysUserData.length = 0
          this.sysUserData.push(...page.data.result)
        }
      } else {
        this.connectionService.isLoginByResult(page.data.msg, '用户列表')
      }
    }, err => {
      appAlert.common.actionFailed('请求"用户列表"')
    })
    return configsObservable
  }
}
