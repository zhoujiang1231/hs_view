import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import {ConnectionService} from '../../core/services/connection.service'
import appAlert from '../../utils/alert'

@Injectable()
export class SysRoleService {
  @observable sysRoleData: any[] = []
  @observable dividedModules: any [] = []

  constructor(private connectionService: ConnectionService) {}

  /**新增角色：post**/
  addSysRole(data, dialogRef, disabled?) {
    const path = '/api/system/roles'
    this.connectionService.post(path, data)
      .then(res => {
        console.log('新增角色', res)
        if (res.data.status === 0) {
          dialogRef.close('success')
          appAlert.common.actionSuccess('新增角色')
        } else {
          if (disabled) {disabled.value = false}
          console.log(res.data.msg)
          appAlert.common.actionFailed('新增角色')
        }
      }).catch(err => {
      if (disabled) {disabled.value = false}
      appAlert.common.actionFailed('新增角色')
    })
  }

  /**删除角色：delete**/
  deleteSysRole(id) {
    const path = '/api/system/roles/' + id
    const configsObservable = Observable.fromPromise(this.connectionService.delete(path))
    configsObservable.subscribe(res => {
        if (res.data.status === 0) {
          appAlert.common.actionSuccess('删除角色')
        } else {
          console.log(res.data.msg)
          appAlert.common.actionFailed(res.data.msg)
        }
      }, err => {
      appAlert.common.actionFailed('删除角色')
    })
    return configsObservable
  }

  /** 角色管理模块:put**/
  sysManageModule (data) {
    const path = '/api/system/role/module?roleId=' + data.roleId
    this.connectionService.put(path, data.modules)
      .then(res => {
        console.log('角色管理模块', res)
        if (res.data.status === 0) {
          appAlert.common.actionSuccess('角色管理模块')
        } else {
          console.log(res.data.msg)
          appAlert.common.actionFailed('角色管理模块')
        }
      }).catch(err => {
      appAlert.common.actionFailed('角色管理模块')
    })
  }

  /**修改角色：put**/
  operateSysRole(data, dialogRef, disabled?) {
    const path = '/api/system/roles'
    const _data = {
      id: data.id,
      name: data.name,
      description: data.description || ''
    }
    this.connectionService.put(path, _data)
      .then(res => {
        console.log('修改角色', res)
        if (res.data.status === 0) {
          dialogRef.close('success')
          appAlert.common.actionSuccess('修改角色')
        } else {
          if (disabled) {disabled.value = false}
          console.log(res.data.msg)
          appAlert.common.actionFailed('修改角色')
        }
      }).catch(err => {
      if (disabled) {disabled.value = false}
      appAlert.common.actionFailed('修改角色')
    })
  }

  /**获取角色列表：get**/
  reloadSysRole(params) {
    const path = '/api/system/roles'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      console.log('获取角色列表', page.data.msg, page.data.status)
      if (page.data.status === 0) {
        if (page.data.permission === 0) {/*请求数据"成功"*/
          this.sysRoleData.length = 0
          this.sysRoleData.push(...page.data.result)
        }
      } else {
        this.connectionService.isLoginByResult(page.data.msg, '角色列表')
      }
    }, err => {
      appAlert.common.actionFailed('请求"角色列表"')
    })
    return configsObservable
  }

  /**请求当前角色已经配置的模块列表 数据**/
  reloadDividedModules(params) {
    const path = '/api/system/role/module'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      console.log('当前角色已配置的模块列表', page.data.msg, page.data.status)
      if (page.data.status === 0) {/*请求数据"成功"*/
        this.dividedModules.length = 0
        this.dividedModules.push(...page.data.result)
      } else {
        this.connectionService.isLoginByResult(page.data.msg, '已配置的模块列表')
      }
    }, err => {
      appAlert.common.actionFailed('请求"已配置的模块列表"')
    })
    return configsObservable
  }
}
