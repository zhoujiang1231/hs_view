import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import appAlert from '../../../utils/alert'
import {ConnectionService} from '../../../core/services/connection.service'

@Injectable()
export class SysoutSettingService {
    /*@observable sysoutSettingData: any[] = []*/

    constructor(private connectionService: ConnectionService) {
    }

    /**获取外呼资费列表：get**/
    reloadOutSettingData(params) {
        const path = '/appCostSetting/outSetting'
        const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params:params}))
        configsObservable.subscribe((page: any) => {
            if (page.data.result === '0') {
                // if (page.data.permission === 0) {/*请求数据"成功"*/
                /*this.sysoutSettingData.push(...page.data.list)*/
                // }
            } else {
                this.connectionService.isLoginByResult(page.data.description, '外呼资费列表')
            }
        }, err => {
            appAlert.common.actionFailed('请求"外呼资费列表"')
        })
        return configsObservable
    }

    /**新增外呼资费：post**/
    addOutSetting(data) {
        const path = '/appCostSetting/outSetting'
        const configsObservable = Observable.fromPromise(this.connectionService.post(path, data))
        configsObservable.subscribe(res => {
            if (res.data.result === '0') {
                appAlert.common.actionSuccess('新增外呼资费')
            } else {
                console.log(res.data.description)
                appAlert.common.actionFailed(res.data.description)
            }
        },err => {
            appAlert.common.actionFailed('新增外呼资费')
        })
        return configsObservable
    }

    /**删除外呼资费：delete**/
    deleteOutSetting(id) {
        const path = '/appCostSetting/outSetting/'+new Number(id)
        const configsObservable = Observable.fromPromise(this.connectionService.delete(path))
        configsObservable.subscribe(res => {
            if (res.data.result === '0') {
                appAlert.common.actionSuccess('删除外呼资费')
            } else {
                console.log(res.data.description)
                appAlert.common.actionFailed(res.data.description)
            }
        },err => {
            appAlert.common.actionFailed('删除外呼资费')
        })
        return configsObservable
    }
    /**修改外呼资费：put**/
    updateOutSetting(data) {
        const path = '/appCostSetting/outSetting'
        const configsObservable = Observable.fromPromise(this.connectionService.put(path,data))
        configsObservable.subscribe(res => {
            if (res.data.result === '0') {
                appAlert.common.actionSuccess('修改外呼资费')
            } else {
                console.log(res.data.description)
                appAlert.common.actionFailed(res.data.description)
            }
        },err => {
            appAlert.common.actionFailed('修改外呼资费')
        })
        return configsObservable
    }
}
