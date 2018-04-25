import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import appAlert from '../../../utils/alert'
import {ConnectionService} from '../../../core/services/connection.service'

@Injectable()
export class SysAppFunctionSettingService {
    @observable appFunctionSettingData: any[] = []

    constructor(private connectionService: ConnectionService) {
    }

    /**获取功能费列表：get**/
    reloadAppFunctionSettingData(params) {
        const path = '/numberCostSetting/appFunctionSetting'
        const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params:params}))
        configsObservable.subscribe((page: any) => {
            if (page.data.result === '0') {
                // if (page.data.permission === 0) {/*请求数据"成功"*/
                this.appFunctionSettingData.push(...page.data.list)
                // }
            } else {
                this.connectionService.isLoginByResult(page.data.description, '功能费列表')
            }
        }, err => {
            appAlert.common.actionFailed('请求"功能费"')
        })
        return configsObservable
    }
    /**修改功能费：put**/
    updateAppFunctionSetting(data) {
        const path = '/numberCostSetting/appFunctionSetting'
        const configsObservable = Observable.fromPromise(this.connectionService.put(path,data))
        configsObservable.subscribe(res => {
            if (res.data.result === '0') {
                appAlert.common.actionSuccess('修改功能费')
            } else {
                console.log(res.data.description)
                appAlert.common.actionFailed(res.data.description)
            }
        },err => {
            appAlert.common.actionFailed('修改功能费')
        })
        return configsObservable
    }

    /**添加功能费：post**/
    addAppFunctionSetting(data) {
        const path = '/numberCostSetting/appFunctionSetting'
        const configsObservable = Observable.fromPromise(this.connectionService.post(path,data))
        configsObservable.subscribe(res => {
            if (res.data.result === '0') {
                appAlert.common.actionSuccess('添加功能费')
            } else {
                console.log(res.data.description)
                appAlert.common.actionFailed(res.data.description)
            }
        },err => {
            appAlert.common.actionFailed('添加功能费')
        })
        return configsObservable
    }

    /**删除功能费：delete**/
    deleteAppFunctionSetting(id) {
        const path = '/numberCostSetting/appFunctionSetting/'+id
        const configsObservable = Observable.fromPromise(this.connectionService.delete(path))
        configsObservable.subscribe(res => {
            if (res.data.result === '0') {
                appAlert.common.actionSuccess('删除功能费')
            } else {
                console.log(res.data.description)
                appAlert.common.actionFailed(res.data.description)
            }
        },err => {
            appAlert.common.actionFailed('删除功能费')
        })
        return configsObservable
    }
}
