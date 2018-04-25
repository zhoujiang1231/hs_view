import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import {ConnectionService} from '../../core/services/connection.service'
import appAlert from '../../utils/alert'

@Injectable()
export class SysUserService {
  /*@observable sysUserData: any[] = []
  @observable userAppData: any[] = []*/
  constructor(private connectionService: ConnectionService) {

  }

    /**删除直销经理：delete**/
    deleteAccount(id) {
        const path = '/vlinkAccount/' + id
        const configsObservable = Observable.fromPromise(this.connectionService.delete(path))
        configsObservable.subscribe(res => {
            console.log(res)
            if (res.data.result === '0') {
                appAlert.common.actionSuccess('删除账号成功')
            } else {
                console.log(res.data.description)
                appAlert.common.actionFailed(res.data.description)
            }
        }, err => {
            appAlert.common.actionFailed('删除账号失败')
        })
        return configsObservable
    }

  /**获取客户列表：get**/
  reloadSysUser() {
    const path = '/vlinkAccounts'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, null))
    configsObservable.subscribe((page: any) => {
      /*console.log(page)
      console.log('获取用户列表', page.data.list, page.data.result)*/
      if (page.data.result === '0') {
        // if (page.data.permission === 0) {/*请求数据"成功"*/
          /*this.sysUserData.length = 0
          this.sysUserData.push(...page.data.list)*/
       // }
      } else {
        this.connectionService.isLoginByResult(page.data.description, '客户列表')
      }
    }, err => {
      appAlert.common.actionFailed('请求"客户列表"')
    })
    return configsObservable
  }

    /**获取客户简称列表：get**/
    reloadCustomerShortName() {
        const path = '/vlinkAccount/shortName'
        const configsObservable = Observable.fromPromise(this.connectionService.get(path, null))
        configsObservable.subscribe((page: any) => {
            /*console.log(page)
            console.log('获取用户列表', page.data.list, page.data.result)*/
        }, err => {
        })
        return configsObservable
    }

    /**获取用户对应应用列表：get**/
    reloadUserApp(params) {
        const path = '/vlinkAccount/vlinkApps'
        const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params : params}))
        configsObservable.subscribe((page: any) => {
            if (page.data.result === '0') {
                // if (page.data.permission === 0) {/*请求数据"成功"*/
                /*this.userAppData.length = 0
                this.userAppData.push(...page.data.list)*/
                // }
            } else {
                this.connectionService.isLoginByResult(page.data.description, '应用列表')
            }
        }, err => {
            appAlert.common.actionFailed('请求"应用列表"')
        })
        return configsObservable
    }

    /*扣费*/
    createCostLog(data){
        const path = '/customerDeductLog'
        this.connectionService.post(path,data)
    }

    /*预扣费*/
    preDeductLog(data){
        const path = '/preDeductLog'
        this.connectionService.post(path,data)
    }

}
