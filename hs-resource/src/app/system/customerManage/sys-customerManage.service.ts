import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import {ConnectionService} from '../../core/services/connection.service'
import appAlert from '../../utils/alert'
import {ConstantService} from "../../core/services/constant.service";
import axios from "axios";

@Injectable()
export class SysCustomerManageService {
    /*@observable sysCustomerData: any[] = []
    @observable directMangerData: any[] = []*/
    @observable sysEnterpriseBasicMessageData: any = {}
    /*@observable fileList: any[] = []*/

    constructor(private connectionService: ConnectionService) {
    }

    /**获取企业列表：get**/
    reloadCustomerData(params) {
        const path = '/customers'
        const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
        configsObservable.subscribe((page: any) => {
            if (page.data.result === '0') {
                // if (page.data.permission === 0) {/*请求数据"成功"*/
                /*this.sysCustomerData.length = 0
                this.sysCustomerData.push(...page.data.list)*/
                // }
            } else {
                this.connectionService.isLoginByResult(page.data.description, '企业列表')
            }
        }, err => {
            appAlert.common.actionFailed('请求"企业列表失败"')
        })
        return configsObservable
    }

    /**新增企业：post**/
    addCustomer(params, dialogRef, disabled?) {
        const path = '/customer'
        const configsObservable = Observable.fromPromise(this.connectionService.post(path, params))
        configsObservable.subscribe(res => {
            if (res.data.result === '0') {
                dialogRef.close('success')
                appAlert.common.actionSuccess('新增企业成功')
            } else {
                if (disabled) {disabled.value = false}
                console.log(res.data.description)
                appAlert.common.actionFailed(res.data.description)
            }
        },err => {
            if (disabled) {disabled.value = false}
            appAlert.common.actionFailed('新增企业失败')
        })
        return configsObservable
    }

    /**获取直销经理：get**/
    reloaddirectMangerData(params) {
        const path = '/directDepartment/directManager'
        const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params:params}))
        configsObservable.subscribe((page: any) => {
            if (page.data.result === '0') {
                // if (page.data.permission === 0) {/*请求数据"成功"*/
                /*this.sysCustomerData.length = 0
                this.sysCustomerData.push(...page.data.list)*/
                // }
            } else {
                this.connectionService.isLoginByResult(page.data.description, '直销经理')
            }
        }, err => {
            appAlert.common.actionFailed('请求"直销经理失败"')
        })
        return configsObservable
    }

    /**获取企业基本信息：get**/
    reloadCustomerMessageData(params) {
        const path = '/customer'
        const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params:params}))
        configsObservable.subscribe((page: any) => {
            if (page.data.result === '0') {
                // if (page.data.permission === 0) {/*请求数据"成功"*/
                this.sysEnterpriseBasicMessageData = {...page.data.data}
                // }
            } else {
                this.connectionService.isLoginByResult(page.data.description, '企业基本信息')
            }
        }, err => {
            appAlert.common.actionFailed('请求"企业基本信息失败"')
        })
        return configsObservable
    }

    /**修改企业基本信息：put**/
    updateEnterpriseBasicMessage(data) {
        const path = '/customer'
        const configsObservable = Observable.fromPromise(this.connectionService.put(path, data))
        configsObservable.subscribe((page: any) => {
                if (page.data.result === '0') {
                    appAlert.common.actionSuccess('修改"企业基本信息成功"')
                } else {
                    appAlert.common.actionFailed(page.data.description)
                }
            },err => {
            appAlert.common.actionFailed('修改"企业基本信息失败"')
        })
        return configsObservable
    }

    /**获取企业文件列表：get**/
    reloadFileList(params) {
        const path = '/customer/files'
        const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
        configsObservable.subscribe((page: any) => {
            if (page.data.result === '0') {
                // if (page.data.permission === 0) {/*请求数据"成功"*/
                /*this.fileList.length = 0
                this.fileList.push(...page.data.list)*/
                // }
            } else {
                this.connectionService.isLoginByResult(page.data.description, '文件列表')
            }
        }, err => {
            appAlert.common.actionFailed('请求"文件列表失败"')
        })
        return configsObservable
    }

    /**查看pdf：get**/
    getPdfFile(realpath) {
        const path = '/pdf?path='+realpath
        this.connectionService.get(path)
            .then((res: any) => {
        }).catch( err => {
            appAlert.common.actionFailed('请求"文件列表失败"')
        })
    }

    /**删除文件：delete**/
    deleteFile(id) {
        const path = '/customer/file/' + id
        const configsObservable = Observable.fromPromise(this.connectionService.delete(path))
        configsObservable.subscribe(res => {
            if (res.data.result === '0') {
                appAlert.common.actionSuccess('删除文件成功')
            } else {
                console.log(res.data.description)
                appAlert.common.actionFailed(res.data.description)
            }
        }, err => {
            appAlert.common.actionFailed('删除文件失败')
        })
        return configsObservable
    }
    /**上传文件：post**/
    upLoadFile(data) {
        const path = '/customer/file'
        const configsObservable = Observable.fromPromise(this.connectionService.postUpload(path, data))
        configsObservable.subscribe(res => {
            if (res.data.result === '0') {
                appAlert.common.actionSuccess('上传文件成功')
            } else {
                console.log(res.data.description)
                appAlert.common.actionFailed(res.data.description)
            }
        }, err => {
            appAlert.common.actionFailed('上传文件失败')
        })
        return configsObservable
    }
    /*检查号码格式*/
    checkNum(num) {
        var patternNumber = eval("/^\\d*[*]$/");
        if(!patternNumber.test(num.trim())) {
            return false;
        }
        return true;
    }
    /*检查单价格式*/
    checkUnitCost(unitCost) {
        var patternUnitCost = eval("/^\\d+([.]\\d+|)$/");
        if(!patternUnitCost.test(unitCost.trim())) {
            return false;
        }
        return true;
    }
}
