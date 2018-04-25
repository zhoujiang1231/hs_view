import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import appAlert from '../../utils/alert'
import {ConnectionService} from '../../core/services/connection.service'

@Injectable()
export class SysEnterpriseAppManagerService {
    @observable sysEnterpriseAppManagerData: any[] = []

    constructor(private connectionService: ConnectionService) {
    }

    /**获取企业应用列表：get**/
    reloadEnterpriseAppManagerData(params) {
        const path = '/customer/app'
        const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params:params}))
        configsObservable.subscribe((page: any) => {
            if (page.data.result === '0') {
                // if (page.data.permission === 0) {/*请求数据"成功"*/
                this.sysEnterpriseAppManagerData.push(...page.data.data)
                // }
            } else {
                this.connectionService.isLoginByResult(page.data.description, '企业应用列表')
            }
        }, err => {
            appAlert.common.actionFailed('请求"企业应用列表"')
        })
        return configsObservable
    }

    /**添加应用：post**/
    addVlinkApp(data, dialogRef, disabled?) {
        const path = '/customerManage/vlinkApp'
        const configsObservable = Observable.fromPromise(this.connectionService.post(path, data))
        configsObservable.subscribe(res => {
                if (res.data.result === '0') {
                    dialogRef.close('success')
                    appAlert.common.actionSuccess('添加应用')
                } else {
                    if (disabled) {disabled.value = false}
                    console.log(res.data.description)
                    appAlert.common.actionFailed(res.data.description)
                }
            },err => {
            if (disabled) {disabled.value = false}
            appAlert.common.actionFailed('添加应用')
        })
        return configsObservable
    }
    /**新建应用：post**/
    createVlinkApp(data) {
        const path = '/vlinkApp'
        const configsObservable = Observable.fromPromise(this.connectionService.post(path, data))
        configsObservable.subscribe(res => {
            if (res.data.result === '0') {
                appAlert.common.actionSuccess('新建应用')
            } else {
                console.log(res.data.description)
                appAlert.common.actionFailed(res.data.description)
            }
        },err => {
            appAlert.common.actionFailed('新建应用')
        })
        return configsObservable
    }

    /**删除应用：delete**/
    deleteVlinkApp(accountId,appId) {
        const path = '/vlinkApp/'+accountId+'/'+appId
        const configsObservable = Observable.fromPromise(this.connectionService.delete(path))
        configsObservable.subscribe(res => {
            if (res.data.result === '0') {
                appAlert.common.actionSuccess('删除应用')
            } else {
                console.log(res.data.description)
                appAlert.common.actionFailed(res.data.description)
            }
        },err => {
            appAlert.common.actionFailed('删除应用')
        })
        return configsObservable
    }
    /**修改应用：put**/
    updateVlinkApp(data) {
        const path = '/vlinkApp'
        const configsObservable = Observable.fromPromise(this.connectionService.put(path,data))
        configsObservable.subscribe(res => {
            if (res.data.result === '0') {
                appAlert.common.actionSuccess('修改应用')
            } else {
                console.log(res.data.description)
                appAlert.common.actionFailed(res.data.description)
            }
        },err => {
            appAlert.common.actionFailed('修改应用')
        })
        return configsObservable
    }
}
