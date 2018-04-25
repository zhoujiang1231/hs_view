import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import appAlert from '../../../utils/alert'
import {ConnectionService} from '../../../core/services/connection.service'

@Injectable()
export class SysOtherSettingService {
    /*@observable messageSettingData: any[] = []
    @observable ussdSettingData: any[] = []
    @observable vncSettingData: any[] = []
    @observable vosSettingData: any = {}*/
    @observable minCostSettingData: any = {}
   /* @observable currentMinCostSettingData: any = {}*/

    constructor(private connectionService: ConnectionService) {
    }

    /**获取短信费列表：get**/
    reloadmessageSettingData(params) {
        const path = '/appCostSetting/messageCostSetting'
        const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params:params}))
        configsObservable.subscribe((page: any) => {
            if (page.data.result === '0') {
                // if (page.data.permission === 0) {/*请求数据"成功"*/
                /*this.messageSettingData.push(...page.data.list)*/
                // }
            } else {
                this.connectionService.isLoginByResult(page.data.description, '短信费列表')
            }
        }, err => {
            appAlert.common.actionFailed('请求"短信费列表"')
        })
        return configsObservable
    }

    /**新增短信费：post**/
    addmessageSetting(data) {
        const path = '/appCostSetting/messageCostSetting'
        const configsObservable = Observable.fromPromise(this.connectionService.post(path, data))
        configsObservable.subscribe(res => {
            if (res.data.result === '0') {
                appAlert.common.actionSuccess('新增短信费')
            } else {
                appAlert.common.actionFailed(res.data.description)
            }
        },err => {
            appAlert.common.actionFailed('新增短信费')
        })
        return configsObservable
    }

    /**删除短信费：delete**/
    deletemessageSetting(id) {
        const path = '/appCostSetting/messageCostSetting/'+new Number(id)
        const configsObservable = Observable.fromPromise(this.connectionService.delete(path))
        configsObservable.subscribe(res => {
            if (res.data.result === '0') {
                appAlert.common.actionSuccess('删除短信费')
            } else {
                appAlert.common.actionFailed(res.data.description)
            }
        },err => {
            appAlert.common.actionFailed('删除短信费')
        })
        return configsObservable
    }
    /**修改短信费：put**/
    updatemessageSetting(data) {
        const path = '/appCostSetting/messageCostSetting'
        const configsObservable = Observable.fromPromise(this.connectionService.put(path,data))
        configsObservable.subscribe(res => {
            if (res.data.result === '0') {
                appAlert.common.actionSuccess('修改短信费')
            } else {
                appAlert.common.actionFailed(res.data.description)
            }
        },err => {
            appAlert.common.actionFailed('修改短信费')
        })
        return configsObservable
    }
    /**获取ussd资费列表：get**/
    reloadussdSettingData(params) {
        const path = '/appCostSetting/ussdCostSetting'
        const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params:params}))
        configsObservable.subscribe((page: any) => {
            if (page.data.result === '0') {
                // if (page.data.permission === 0) {/*请求数据"成功"*/
                /*this.ussdSettingData.push(...page.data.list)*/
                // }
            } else {
                this.connectionService.isLoginByResult(page.data.description, 'ussd资费列表')
            }
        }, err => {
            appAlert.common.actionFailed('请求"ussd资费列表"')
        })
        return configsObservable
    }

    /**新增ussd资费：post**/
    addussdSetting(data) {
        const path = '/appCostSetting/ussdCostSetting'
        const configsObservable = Observable.fromPromise(this.connectionService.post(path, data))
        configsObservable.subscribe(res => {
            if (res.data.result === '0') {
                appAlert.common.actionSuccess('新增ussd资费')
            } else {
                appAlert.common.actionFailed(res.data.description)
            }
        },err => {
            appAlert.common.actionFailed('新增ussd资费')
        })
        return configsObservable
    }

    /**删除ussd资费：delete**/
    deleteussdSetting(id) {
        const path = '/appCostSetting/ussdCostSetting/'+new Number(id)
        const configsObservable = Observable.fromPromise(this.connectionService.delete(path))
        configsObservable.subscribe(res => {
            if (res.data.result === '0') {
                appAlert.common.actionSuccess('删除ussd资费')
            } else {
                console.log(res.data.description)
                appAlert.common.actionFailed(res.data.description)
            }
        },err => {
            appAlert.common.actionFailed('删除ussd资费')
        })
        return configsObservable
    }
    /**修改ussd资费：put**/
    updateussdSetting(data) {
        const path = '/appCostSetting/ussdCostSetting'
        const configsObservable = Observable.fromPromise(this.connectionService.put(path,data))
        configsObservable.subscribe(res => {
            if (res.data.result === '0') {
                appAlert.common.actionSuccess('修改ussd资费')
            } else {
                appAlert.common.actionFailed(res.data.description)
            }
        },err => {
            appAlert.common.actionFailed('修改ussd资费')
        })
        return configsObservable
    }
    /**获取vnc资费列表：get**/
    reloadvncSettingData(params) {
        const path = '/appCostSetting/vncCostSetting'
        const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params:params}))
        configsObservable.subscribe((page: any) => {
            if (page.data.result === '0') {
                // if (page.data.permission === 0) {/*请求数据"成功"*/
                /*this.vncSettingData.push(...page.data.list)*/
                // }
            } else {
                this.connectionService.isLoginByResult(page.data.description, 'vnc资费列表')
            }
        }, err => {
            appAlert.common.actionFailed('请求"vnc资费列表"')
        })
        return configsObservable
    }

    /**新增vnc资费：post**/
    addvncSetting(data) {
        const path = '/appCostSetting/vncCostSetting'
        const configsObservable = Observable.fromPromise(this.connectionService.post(path, data))
        configsObservable.subscribe(res => {
            if (res.data.result === '0') {
                appAlert.common.actionSuccess('新增vnc资费')
            } else {
                appAlert.common.actionFailed(res.data.description)
            }
        },err => {
            appAlert.common.actionFailed('新增vnc资费')
        })
        return configsObservable
    }

    /**删除vnc资费：delete**/
    deletevncSetting(id) {
        const path = '/appCostSetting/vncCostSetting/'+new Number(id)
        const configsObservable = Observable.fromPromise(this.connectionService.delete(path))
        configsObservable.subscribe(res => {
            if (res.data.result === '0') {
                appAlert.common.actionSuccess('删除vnc资费')
            } else {
                appAlert.common.actionFailed(res.data.description)
            }
        },err => {
            appAlert.common.actionFailed('删除vnc资费')
        })
        return configsObservable
    }
    /**修改vnc资费：put**/
    updatevncSetting(data) {
        const path = '/appCostSetting/vncCostSetting'
        const configsObservable = Observable.fromPromise(this.connectionService.put(path,data))
        configsObservable.subscribe(res => {
            if (res.data.result === '0') {
                appAlert.common.actionSuccess('修改vnc资费')
            } else {
                appAlert.common.actionFailed(res.data.description)
            }
        },err => {
            appAlert.common.actionFailed('修改vnc资费')
        })
        return configsObservable
    }

    /**获取vos资费列表：get**/
    reloadvosSettingData(params) {
        const path = '/appCostSetting/vosCostSetting'
        const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params:params}))
        configsObservable.subscribe((page: any) => {
            if (page.data.result === '0') {
                // if (page.data.permission === 0) {/*请求数据"成功"*/
                /*this.vosSettingData = {...page.data.data}*/
                // }
            } else {
                this.connectionService.isLoginByResult(page.data.description, 'vos资费列表')
            }
        }, err => {
            appAlert.common.actionFailed('请求"vos资费列表"')
        })
        return configsObservable
    }

    /**修改vos资费：put**/
    updatevosSetting(data) {
        const path = '/appCostSetting/vosCostSetting'
        const configsObservable = Observable.fromPromise(this.connectionService.put(path,data))
        configsObservable.subscribe(res => {
            if (res.data.result === '0') {
                appAlert.common.actionSuccess('修改vos资费')
            } else {
                appAlert.common.actionFailed(res.data.description)
            }
        },err => {
            appAlert.common.actionFailed('修改vos资费')
        })
        return configsObservable
    }

    /**获取应用最低月消列表：get**/
    reloadminCost(params) {
        const path = '/appCostSetting/minCostSetting'
        const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params:params}))
        configsObservable.subscribe((page: any) => {
            if (page.data.result === '0') {
                // if (page.data.permission === 0) {/*请求数据"成功"*/
                this.minCostSettingData = {...page.data.data}
                // }
            } else {
                this.connectionService.isLoginByResult(page.data.description, '应用最低月消列表')
            }
        }, err => {
            appAlert.common.actionFailed('请求"应用最低月消"')
        })
        return configsObservable
    }

    /**修改应用最低月消：put**/
    updateminCost(data) {
        const path = '/appCostSetting/minCostSetting'
        const configsObservable = Observable.fromPromise(this.connectionService.put(path,data))
        configsObservable.subscribe(res => {
            if (res.data.result === '0') {
                appAlert.common.actionSuccess('修改应用最低月消')
            } else {
                appAlert.common.actionFailed(res.data.description)
            }
        },err => {
            appAlert.common.actionFailed('修改应用最低月消')
        })
        return configsObservable
    }

    /**获取应用当前月低消：get**/
    reloadCurrentMinCost(params) {
        const path = '/appCostSetting/currentMinCost'
        const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params:params}))
        configsObservable.subscribe((page: any) => {
            if (page.data.result === '0') {
                // if (page.data.permission === 0) {/*请求数据"成功"*/
                /*this.currentMinCostSettingData = {...page.data.data}*/
                // }
            } else {
                this.connectionService.isLoginByResult(page.data.description, '应用当前月低消')
            }
        }, err => {
            appAlert.common.actionFailed('请求"应用当前月低消"')
        })
        return configsObservable
    }
    /*检查短信 vnc ussd等参数*/
    checkNum(num) {
        var patternNumber = eval("/^\\d+$/");
        if(!patternNumber.test(num.trim())) {
            return false;
        }
        return true;
    }
    /*检查短信 vnc ussd等单价参数*/
    checkUnitCost(unitCost) {
        var patternUnitCost = eval("/^\\d+([.]\\d+|)$/");
        if(!patternUnitCost.test(unitCost.trim())) {
            return false;
        }
        return true;
    }
}
