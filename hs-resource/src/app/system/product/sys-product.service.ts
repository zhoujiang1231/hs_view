import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import appAlert from '../../utils/alert'
import {ConnectionService} from '../../core/services/connection.service'

@Injectable()
export class SysProductService {
  @observable sysProductData: any[] = []
  @observable sysSettingData: any[] = []

  constructor(private connectionService: ConnectionService) {}

  /**新增产品线：post**/
  addSysProduct(data, dialogRef, disabled?) {
    const path = '/api/system/products'
    this.connectionService.post(path, data)
      .then(res => {
        console.log('新增产品线', res)
        if (res.data.status === 0) {
          dialogRef.close('success')
          appAlert.common.actionSuccess('新增产品线')
        } else {
          if (disabled) {disabled.value = false}
          console.log(res.data.msg)
          appAlert.common.actionFailed('新增产品线')
        }
      }).catch(err => {
      if (disabled) {disabled.value = false}
      appAlert.common.actionFailed('新增产品线')
    })
  }

  /**删除产品线：delete**/
  deleteSysProduct(id) {
    const path = '/api/system/products/' + id
    const configsObservable = Observable.fromPromise(this.connectionService.delete(path))
    configsObservable.subscribe(res => {
      // console.log(res)
        if (res.data.status === 0) {
          appAlert.common.actionSuccess('删除产品线')
        } else {
          console.log(res.data.msg)
          appAlert.login.failed(res.data.msg)
        }
      }, err => {
      appAlert.common.actionFailed('删除产品线')
    })
    return configsObservable
  }

  /**修改产品线：put**/
  operateSysProduct(data, dialogRef, disabled?) {
    const path = '/api/system/products'
    const _data = {
      id: data.id,
      name: data.name,
      description: data.description || ''
    }
    this.connectionService.put(path, _data)
      .then(res => {
        console.log('修改产品线', res)
        if (res.data.status === 0) {
          dialogRef.close('success')
          appAlert.common.actionSuccess('修改产品线')
        } else {
          if (disabled) {disabled.value = false}
          console.log(res.data.msg)
          appAlert.common.actionFailed('修改产品线')
        }
      }).catch(err => {
      if (disabled) {disabled.value = false}
      appAlert.common.actionFailed('修改产品线')
    })
  }

  /**获取产品线列表：get**/
  reloadSysProduct(params) {
    const path = '/api/system/products'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      console.log('获取产品线列表', page.data.msg, page.data.status)
      if (page.data.status === 0) {
        if (page.data.permission === 0) {/*请求数据"成功"*/
          this.sysProductData.length = 0
          this.sysProductData.push(...page.data.result)
        }
      } else {
        this.connectionService.isLoginByResult(page.data.msg, '产品线列表')
      }
    }, err => {
      appAlert.common.actionFailed('请求"产品线列表"')
    })
    return configsObservable
  }

  /**获取产品设置列表：get**/
  reloadSysProductSetting(params) {
    const path = '/api/system/product/settings'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      console.log('获取产品设置列表', page.data.msg, page.data.status)
      if (page.data.status === 0) {/*请求数据"成功"*/
        this.sysSettingData.length = 0
        this.sysSettingData.push(...page.data.result)
      } else {
        this.connectionService.isLoginByResult(page.data.msg, '产品设置列表')
      }
    }, err => {
      appAlert.common.actionFailed('请求"产品设置列表"')
    })
    return configsObservable
  }

  /**修改 修改产品设置：put**/
  operateSysProductSetting (data, dialogRef, disabled?) {
    const path = '/api/system/product/settings'
    this.connectionService.put(path, data)
      .then(res => {
        console.log('修改产品设置', res)
        if (res.data.status === 0) {
          dialogRef.close('success')
          appAlert.common.actionSuccess('修改产品设置')
        } else {
          if (disabled) {disabled.value = false}
          console.log(res.data.msg)
          appAlert.common.actionFailed('修改产品设置')
        }
      }).catch(err => {
      if (disabled) {disabled.value = false}
      appAlert.common.actionFailed('修改产品设置')
    })
  }

  /**新增产品线设置：post**/
  addSysProductSetting(data, dialogRef, disabled?) {
    const path = '/api/system/product/settings'
    this.connectionService.post(path, data)
      .then(res => {
        console.log('新增产品设置', res)
        if (res.data.status === 0) {
          dialogRef.close('success')
          appAlert.common.actionSuccess('新增产品设置')
        } else {
          if (disabled) {disabled.value = false}
          console.log(res.data.msg)
          appAlert.common.actionFailed('新增产品设置')
        }
      }).catch(err => {
      if (disabled) {disabled.value = false}
      appAlert.common.actionFailed('新增产品设置')
    })
  }

  /**删除产品线设置：delete**/
  deleteSysProductSetting(id) {
    const path = '/api/system/product/settings/' + id
    const configsObservable = Observable.fromPromise(this.connectionService.delete(path))
    configsObservable.subscribe(res => {
      // console.log(res)
      if (res.data.status === 0) {
        appAlert.common.actionSuccess('删除产品设置')
      } else {
        console.log(res.data.msg)
        appAlert.common.actionFailed('删除产品设置')
      }
    }, err => {
      appAlert.common.actionFailed('删除产品设置')
    })
    return configsObservable
  }
}
