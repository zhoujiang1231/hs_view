import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import appAlert from '../../utils/alert'
import {ConnectionService} from '../../core/services/connection.service'

@Injectable()
export class SysEnterpriseFirmMessageService {
    @observable sysEnterpriseFirmMessageData: any[] = []
    @observable departMentArr: any[] = []
    @observable allMinCosts: any = {}

    constructor(private connectionService: ConnectionService) {
        this.departMentArr.push({id: '', fullName: '全部'})
    }

    /*修改本月折扣*/
    updateCurrentRebate(data) {
        const path = '/customerCostSetting/currentRebate'
        const configsObservable = Observable.fromPromise(this.connectionService.put(path, data))
        configsObservable.subscribe(res => {
                console.log('修改本月折扣', res)
                /*if (res.data.result === '0') {
                    appAlert.common.actionSuccess('修改本月折扣')
                } else {
                    appAlert.common.actionFailed('修改本月折扣')
                }
            },err => {
            appAlert.common.actionFailed('修改本月折扣')*/
        })
        return configsObservable
    }

    /*修改企业月低消*/
    updateMinCost(data) {
        const path = '/customerCostSetting/minCost'
        const configsObservable = Observable.fromPromise(this.connectionService.put(path, data))
        configsObservable.subscribe(res => {
                console.log('修改企业月低消', res)
                /*if (res.data.result === '0') {
                    appAlert.common.actionSuccess('修改企业月低消')
                } else {
                    appAlert.common.actionFailed('修改企业月低消')
                }
            },err => {
            appAlert.common.actionFailed('修改企业月低消')*/
        })
        return configsObservable
    }
    /*获取企业当前月低消详情*/
    /**获取企业列表：get**/
    getAllMinCosts(params) {
        const path = '/customer/minCosts'
        const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
        configsObservable.subscribe((page: any) => {
            console.log('获取企业列表', page.data.description, page.data.result)
            if (page.data.result === '0') {
                // if (page.data.permission === 0) {/*请求数据"成功"*/
                this.allMinCosts={...page.data.data}
                // }
            } else {
                this.connectionService.isLoginByResult(page.data.description, '企业当前月低消详情')
            }
        }, err => {
            appAlert.common.actionFailed('请求"企业当前月低消详情"')
        })
        return configsObservable
    }
}
