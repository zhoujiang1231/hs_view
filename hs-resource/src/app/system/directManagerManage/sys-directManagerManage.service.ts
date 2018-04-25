import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import appAlert from '../../utils/alert'
import {ConnectionService} from '../../core/services/connection.service'

@Injectable()
export class SysManagerManageService {
  /*@observable directManagerData: any[] = []
  @observable departMentArr: any[] = []*/

  constructor(private connectionService: ConnectionService) {
  }

  /**新增直销经理：post**/
  addDirectManager(data, dialogRef, disabled?) {
    const path = '/directManager'
    this.connectionService.post(path, data)
      .then(res => {
        console.log('新增直销经理', res)
        if (res.data.result === '0') {
          dialogRef.close('success')
          appAlert.common.actionSuccess('新增直销经理成功')
        } else {
          if (disabled) {disabled.value = false}
          console.log(res.data.description)
          appAlert.common.actionFailed(res.data.description)
        }
      }).catch(err => {
      if (disabled) {disabled.value = false}
      appAlert.common.actionFailed('新增直销经理失败')
    })
  }

  /**删除直销经理：delete**/
  deleteDirectManager(id) {
    const path = '/vlinkAccount/' + id
    const configsObservable = Observable.fromPromise(this.connectionService.delete(path))
    configsObservable.subscribe(res => {
      console.log(res)
        if (res.data.result === '0') {
          appAlert.common.actionSuccess('删除直销经理成功')
        } else {
          console.log(res.data.description)
          appAlert.common.actionFailed(res.data.description)
        }
      }, err => {
      appAlert.common.actionFailed('删除直销经理失败')
    })
    return configsObservable
  }

  /**修改直销经理：put**/
  operateDirectManager(data, dialogRef, disabled?) {
    const path = '/directManager'
    this.connectionService.put(path, data)
      .then(res => {
        console.log('修改直销经理', res)
        if (res.data.result === '0') {
          dialogRef.close('success')
          appAlert.common.actionSuccess('修改直销经理成功')
        } else {
          if (disabled) {disabled.value = false}
          console.log(res.data.description)
          appAlert.common.actionFailed(res.data.description)
        }
      }).catch(err => {
      if (disabled) {disabled.value = false}
      appAlert.common.actionFailed('修改直销经理失败')
    })
  }

  /**获取直销经理列表：get**/
  reloadAllDirectManager(params) {
    const path = '/directManagers'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      // console.log('获取直销部门列表', page.data.msg, page.data.status)
      if (page.data.result === '0') {
        //if (page.data.permission === 0) {/*请求数据"成功"*/
          /*this.directManagerData.length = 0
          this.directManagerData.push(...page.data.list)*/
        //}
      } else {
        this.connectionService.isLoginByResult(page.data.description, '直销经理列表')
      }
    }, err => {
      appAlert.common.actionFailed('请求"直销经理列表"')
    })
    return configsObservable
  }

    /**获取所属部门下拉框：get**/
    reloaddirectDepartmentIdAndName() {
        const path = '/directDepartmentIdAndName'
        const configsObservable = Observable.fromPromise(this.connectionService.get(path, null))
        configsObservable.subscribe((page: any) => {
            // console.log('获取直销部门列表', page.data.msg, page.data.status)
            if (page.data.result === '0') {
                //if (page.data.permission === 0) {/*请求数据"成功"*/
                /*this.departMentArr.length = 0
                this.departMentArr.push(...page.data.list)*/
                //}
            } else {
                this.connectionService.isLoginByResult(page.data.description, '所属部门')
            }
        }, err => {
            appAlert.common.actionFailed('请求"所属部门失败"')
        })
        return configsObservable
    }
}
