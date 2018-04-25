import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import appAlert from '../../utils/alert'
import {ConnectionService} from '../../core/services/connection.service'

@Injectable()
export class SysDitectDepartmentManageService {
  /*@observable sysProductData: any[] = []
  @observable sysSettingData: any[] = []*/

  constructor(private connectionService: ConnectionService) {}

  /**新增直销部门：post**/
  addDirectDepartment(data, dialogRef, disabled?) {
    const path = '/directDepartment'
    this.connectionService.post(path, data)
      .then(res => {
        console.log('新增直销部门', res)
        if (res.data.result === '0') {
          dialogRef.close('success')
          appAlert.common.actionSuccess(res.data.description)
        } else {
          if (disabled) {disabled.value = false}
          console.log(res.data.description)
          appAlert.common.actionFailed(res.data.description)
        }
      }).catch(err => {
      if (disabled) {disabled.value = false}
      appAlert.common.actionFailed('新增直销部门失败')
    })
  }

  /**删除直销部门：delete**/
  deleteDirectDepartment(id) {
    const path = '/vlinkAccount/' + id
    const configsObservable = Observable.fromPromise(this.connectionService.delete(path))
    configsObservable.subscribe(res => {
      console.log(res)
        if (res.data.result === '0') {
          appAlert.common.actionSuccess('删除直销部门成功')
        } else {
          console.log(res.data.description)
          appAlert.common.actionFailed(res.data.description)
        }
      }, err => {
      appAlert.common.actionFailed('删除直销部门失败')
    })
    return configsObservable
  }

  /**修改直销部门：put**/
  operateDirectDepartment(data, dialogRef, disabled?) {
    const path = '/directDepartment'
    this.connectionService.put(path, data)
      .then(res => {
        console.log('修改直销部门', res)
        if (res.data.result === '0') {
          dialogRef.close('success')
          appAlert.common.actionSuccess('修改直销部门成功')
        } else {
          if (disabled) {disabled.value = false}
          console.log(res.data.description)
          appAlert.common.actionFailed(res.data.description)
        }
      }).catch(err => {
      if (disabled) {disabled.value = false}
      appAlert.common.actionFailed('修改直销部门失败')
    })
  }

  /**获取直销部门列表：get**/
  reloadAllDirectDepartment(params) {
    const path = '/directDepartments'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      // console.log('获取直销部门列表', page.data.msg, page.data.status)
      if (page.data.result === '0') {
        //if (page.data.permission === 0) {/*请求数据"成功"*/
          /*this.sysProductData.length = 0
          this.sysProductData.push(...page.data.list)*/
        //}
      } else {
        this.connectionService.isLoginByResult(page.data.description, '直销部门列表')
      }
    }, err => {
      appAlert.common.actionFailed('请求"直销部门列表失败"')
    })
    return configsObservable
  }

  /**获取直销部门详情：get**/
  reloadDirectDepartment(params) {
    const path = '/directDepartment'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      console.log('获取产品设置列表', page.data.description, page.data.result)
      if (page.data.result === '0') {/*请求数据"成功"*/
        /*this.sysSettingData.length = 0
        this.sysSettingData.push(...page.data.list)*/
      } else {
        this.connectionService.isLoginByResult(page.data.description, '直销部门详情')
      }
    }, err => {
      appAlert.common.actionFailed('请求"直销部门详情失败"')
    })
    return configsObservable
  }

}
