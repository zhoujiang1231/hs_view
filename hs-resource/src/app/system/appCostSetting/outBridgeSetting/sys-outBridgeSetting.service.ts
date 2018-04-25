import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import appAlert from '../../../utils/alert'
import {ConnectionService} from '../../../core/services/connection.service'

@Injectable()
export class SysoutBridgeSettingService {
    /*@observable sysoutBridgeSettingData: any[] = []*/

    constructor(private connectionService: ConnectionService) {
    }

    /**获取外呼转接资费列表：get**/
    reloadOutBridgeSettingData(params) {
        const path = '/appCostSetting/outBridgeSetting'
        const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params:params}))
        configsObservable.subscribe((page: any) => {
            if (page.data.result === '0') {
                // if (page.data.permission === 0) {/*请求数据"成功"*/
                /*this.sysoutBridgeSettingData.push(...page.data.list)*/
                // }
            } else {
                this.connectionService.isLoginByResult(page.data.description, '外呼转接资费列表')
            }
        }, err => {
            appAlert.common.actionFailed('请求"外呼转接资费列表"')
        })
        return configsObservable
    }

    /**新增外呼转接资费：post**/
    addOutBridgeSetting(data) {
        const path = '/appCostSetting/outBridgeSetting'
        const configsObservable = Observable.fromPromise(this.connectionService.post(path, data))
        configsObservable.subscribe(res => {
            if (res.data.result === '0') {
                appAlert.common.actionSuccess('新增外呼转接资费')
            } else {
                console.log(res.data.description)
                appAlert.common.actionFailed(res.data.description)
            }
        },err => {
            appAlert.common.actionFailed('新增外呼转接资费')
        })
        return configsObservable
    }

    /**删除外呼转接资费：delete**/
    deleteOutBridgeSetting(id) {
        const path = '/appCostSetting/outBridgeSetting/'+new Number(id)
        const configsObservable = Observable.fromPromise(this.connectionService.delete(path))
        configsObservable.subscribe(res => {
            if (res.data.result === '0') {
                appAlert.common.actionSuccess('删除外呼转接资费')
            } else {
                console.log(res.data.description)
                appAlert.common.actionFailed(res.data.description)
            }
        },err => {
            appAlert.common.actionFailed('删除外呼转接资费')
        })
        return configsObservable
    }
    /**修改外呼转接资费：put**/
    updateOutBridgeSetting(data) {
        const path = '/appCostSetting/outBridgeSetting'
        const configsObservable = Observable.fromPromise(this.connectionService.put(path,data))
        configsObservable.subscribe(res => {
            if (res.data.result === '0') {
                appAlert.common.actionSuccess('修改外呼转接资费')
            } else {
                console.log(res.data.description)
                appAlert.common.actionFailed(res.data.description)
            }
        },err => {
            appAlert.common.actionFailed('修改外呼转接资费')
        })
        return configsObservable
    }
}
