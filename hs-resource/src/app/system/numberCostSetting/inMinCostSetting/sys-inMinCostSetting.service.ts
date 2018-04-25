import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import appAlert from '../../../utils/alert'
import {ConnectionService} from '../../../core/services/connection.service'

@Injectable()
export class SysInMinCostSettingService {
    @observable inMinCostSettingData: any[] = []

    constructor(private connectionService: ConnectionService) {
    }

    /**获取呼入低消列表：get**/
    reloadInMinCostSettingData(params) {
        const path = '/numberCostSetting/inMinCostSetting'
        const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params:params}))
        configsObservable.subscribe((page: any) => {
            if (page.data.result === '0') {
                // if (page.data.permission === 0) {/*请求数据"成功"*/
                this.inMinCostSettingData.push(...page.data.list)
                // }
            } else {
                this.connectionService.isLoginByResult(page.data.description, '呼入低消列表')
            }
        }, err => {
            appAlert.common.actionFailed('请求"呼入低消列表"')
        })
        return configsObservable
    }
    /**修改呼入低消资费：put**/
    updateInMinCostSetting(data) {
        const path = '/numberCostSetting/inMinCostSetting'
        const configsObservable = Observable.fromPromise(this.connectionService.put(path,data))
        configsObservable.subscribe(res => {
            if (res.data.result === '0') {
                appAlert.common.actionSuccess('修改呼入低消资费')
            } else {
                console.log(res.data.description)
                appAlert.common.actionFailed(res.data.description)
            }
        },err => {
            appAlert.common.actionFailed('修改呼入低消资费')
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
