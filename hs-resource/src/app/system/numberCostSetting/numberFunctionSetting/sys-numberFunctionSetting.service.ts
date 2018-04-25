import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import appAlert from '../../../utils/alert'
import {ConnectionService} from '../../../core/services/connection.service'

@Injectable()
export class SysNumberFunctionSettingService {
    @observable numberFunctionSettingData: any[] = []

    constructor(private connectionService: ConnectionService) {
    }

    /**获取号码功能费列表：get**/
    reloadNumberFunctionSettingData(params) {
        const path = '/numberCostSetting/numberFunctionSetting'
        const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params:params}))
        configsObservable.subscribe((page: any) => {
            if (page.data.result === '0') {
                // if (page.data.permission === 0) {/*请求数据"成功"*/
                this.numberFunctionSettingData.push(...page.data.list)
                // }
            } else {
                this.connectionService.isLoginByResult(page.data.description, '号码功能费列表')
            }
        }, err => {
            appAlert.common.actionFailed('请求"号码功能费"')
        })
        return configsObservable
    }
    /**修改号码功能费：put**/
    updateNumberFunctionSetting(data) {
        const path = '/numberCostSetting/numberFunctionSetting'
        const configsObservable = Observable.fromPromise(this.connectionService.put(path,data))
        configsObservable.subscribe(res => {
            if (res.data.result === '0') {
                appAlert.common.actionSuccess('修改号码功能费')
            } else {
                console.log(res.data.description)
                appAlert.common.actionFailed(res.data.description)
            }
        },err => {
            appAlert.common.actionFailed('修改号码功能费')
        })
        return configsObservable
    }
    /*同步号码*/
    importNumberFromVlink(params){
        const path = '/numberCostSetting/numberFromVlink'
        const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params:params}))
        configsObservable.subscribe((page: any) => {
            if (page.data.result === '0') {
            } else {
                this.connectionService.isLoginByResult(page.data.description, '同步号码')
            }
        }, err => {
            appAlert.common.actionFailed('同步号码')
        })
        return configsObservable
    }
}
