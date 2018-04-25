import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import appAlert from '../../../utils/alert'
import {ConnectionService} from '../../../core/services/connection.service'

@Injectable()
export class SysinSettingService {
    /*@observable sysinSettingData: any[] = []*/

    constructor(private connectionService: ConnectionService) {
    }

    /**获取呼入资费列表：get**/
    reloadInSettingData(params) {
        const path = '/appCostSetting/inSetting'
        const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params:params}))
        configsObservable.subscribe((page: any) => {
            if (page.data.result === '0') {
                // if (page.data.permission === 0) {/*请求数据"成功"*/
                /*this.sysinSettingData.push(...page.data.list)*/
                // }
            } else {
                this.connectionService.isLoginByResult(page.data.description, '呼入资费列表')
            }
        }, err => {
            appAlert.common.actionFailed('请求"呼入资费列表"')
        })
        return configsObservable
    }

    /**新增呼入资费：post**/
    addInSetting(data) {
        const path = '/appCostSetting/inSetting'
        const configsObservable = Observable.fromPromise(this.connectionService.post(path, data))
        configsObservable.subscribe(res => {
            if (res.data.result === '0') {
                appAlert.common.actionSuccess('新增呼入资费')
            } else {
                console.log(res.data.description)
                appAlert.common.actionFailed(res.data.description)
            }
        },err => {
            appAlert.common.actionFailed('新增呼入资费')
        })
        return configsObservable
    }

    /**删除呼入资费：delete**/
    deleteInSetting(id) {
        const path = '/appCostSetting/inSetting/'+new Number(id)
        const configsObservable = Observable.fromPromise(this.connectionService.delete(path))
        configsObservable.subscribe(res => {
            if (res.data.result === '0') {
                appAlert.common.actionSuccess('删除呼入资费')
            } else {
                console.log(res.data.description)
                appAlert.common.actionFailed(res.data.description)
            }
        },err => {
            appAlert.common.actionFailed('删除呼入资费')
        })
        return configsObservable
    }
    /**修改呼入资费：put**/
    updateInSetting(data) {
        const path = '/appCostSetting/inSetting'
        const configsObservable = Observable.fromPromise(this.connectionService.put(path,data))
        configsObservable.subscribe(res => {
            if (res.data.result === '0') {
                appAlert.common.actionSuccess('修改呼入资费')
            } else {
                console.log(res.data.description)
                appAlert.common.actionFailed(res.data.description)
            }
        },err => {
            appAlert.common.actionFailed('修改呼入资费')
        })
        return configsObservable
    }
}
