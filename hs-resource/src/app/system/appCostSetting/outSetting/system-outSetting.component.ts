import {Component, OnInit} from '@angular/core'
import {MatDialog} from '@angular/material'
import appAlert from '../../../utils/alert'
import {LocalStorage} from "../../../core/services/localstorage.service";
import {Router} from "@angular/router";
import {SysoutSettingService} from "./sys-outSetting.service";
import {SysOperationLogService} from "../../operationLog/sys-operationLog.service";
import {SysCustomerManageService} from "../../customerManage/sys-customerManage.service";

@Component({
    selector: 'app-system-outSetting',
    templateUrl: 'system-outSetting.component.html',
    styleUrls: ['system-outSetting.component.less']
})

export class SystemoutSettingComponent implements OnInit {
    outSettingData: any[] = []
    addAppCostSettingParams: any = {}
    updateoutSettingDataParams: any[] = []
    updateoutSettingParams: any ={}
    beforeUpdate
    params: any = {limit: 10, start: 0}
    /**请求后端数据的参数**/
    loadingIndicator = true
    appIdAndName: any = {}

    constructor(private router: Router,
                private sysoutSettingService:SysoutSettingService,
                private sysCustomerManageService:SysCustomerManageService,
                private sysOperationLogService:SysOperationLogService) {
    }

    ngOnInit() {
        if (LocalStorage.get('appId')) {
            this.appIdAndName.appId = LocalStorage.get('appId')
            this.appIdAndName.appName = LocalStorage.get('appName')
            this.reloadOutSettingData()
            this.addAppCostSettingParams.appId = LocalStorage.get('appId')
        }
    }
    /*获取外呼资费列表*/
    reloadOutSettingData(){
        this.sysoutSettingService.reloadOutSettingData({appId:LocalStorage.get('appId')})
            .subscribe(page =>{
                this.outSettingData = [...page.data.list]
                this.updateoutSettingDataParams = JSON.parse(JSON.stringify(this.outSettingData))
            })
    }

    /**应用资费各页面之间跳转**/
    appSettingTo(value) {
        this.router.navigate([value])
    }
    /**新增外呼资费**/
    addOutSetting(){
        if(this.sysCustomerManageService.checkNum(this.addAppCostSettingParams.clidNumber)&&this.sysCustomerManageService.checkNum(this.addAppCostSettingParams.calleeNumber)&&this.sysCustomerManageService.checkUnitCost(this.addAppCostSettingParams.unitCost)) {
            this.addAppCostSettingParams.operationStr = LocalStorage.get('operator')+','+LocalStorage.get('operation_account')+','+LocalStorage.get('appName')+',,外显号码:'+this.addAppCostSettingParams.clidNumber+' 被叫号码:'+this.addAppCostSettingParams.calleeNumber+' 单价:'+this.addAppCostSettingParams.unitCost+',添加外呼资费'
            this.sysoutSettingService.addOutSetting(this.addAppCostSettingParams)
                .subscribe(page => {
                    if (page.data.result == 0) {
                        this.reloadOutSettingData()
                    }
                })
        }
        else{
            appAlert.common.confirmWarning('请确保格式如下： 热线号码:123*或* 单价:12.3或12！')
        }
    }
    /*修改外呼资费*/
    updateOutSetting(row){
        this.outSettingData.forEach(item =>{
            if(row.appId == item.appId && row.id == item.id) {
                this.beforeUpdate = LocalStorage.get('operator')+','+LocalStorage.get('operation_account')+','+LocalStorage.get('appName')+',外显号码:'+item.clidNumber+' 被叫号码:'+item.calleeNumber+' 单价:'+item.unitCost
            }
        })
        this.updateoutSettingDataParams.forEach(item=>{
            if(row.appId == item.appId && row.id == item.id){
                var operationStr = this.beforeUpdate+',外显号码:'+item.clidNumber+' 被叫号码:'+item.calleeNumber+' 单价:'+item.unitCost+',修改外呼资费'
                this.updateoutSettingParams.appId = item.appId
                this.updateoutSettingParams.id = item.id
                this.updateoutSettingParams.unitCost = item.unitCost
                this.updateoutSettingParams.clidNumber = item.clidNumber
                this.updateoutSettingParams.calleeNumber = item.calleeNumber
                this.updateoutSettingParams.operationStr = operationStr
                this.sysoutSettingService.updateOutSetting(this.updateoutSettingParams)
                    .subscribe(page =>{
                        if(page.data.result == 0){
                            this.reloadOutSettingData()
                        }
                    })
            }
        })
    }
    /*单价修改时数据绑定*/
    unitCostChange(event,row){
        this.updateoutSettingDataParams.forEach(item=>{
            if(row.id == item.id &&row.appId == item.appId){
                item.unitCost = event.srcElement.value
            }
        })
    }
    /*外显号码修改时数据绑定*/
    clidNumberChange(event,row){
        this.updateoutSettingDataParams.forEach(item=>{
            if(row.id == item.id &&row.appId == item.appId){
                item.clidNumber = event.srcElement.value
            }
        })
    }

    /*被叫号码修改时数据绑定*/
    calleeNumberChange(event,row){
        this.updateoutSettingDataParams.forEach(item=>{
            if(row.id == item.id &&row.appId == item.appId){
                item.calleeNumber = event.srcElement.value
            }
        })
    }
    /*删除外呼资费*/
    deleteOutSetting(row){
        this.sysoutSettingService.deleteOutSetting(row.id)
            .subscribe(page => {
                if(page.data.result == 0){
                    this.reloadOutSettingData()
                    var operationStr = LocalStorage.get('operator')+','+LocalStorage.get('operation_account')+','+LocalStorage.get('appName')+',外显号码:'+row.clidNumber+' 被叫号码:'+row.calleeNumber+' 单价:'+row.unitCost+',,删除外呼资费'
                    this.sysOperationLogService.deleteCostSettingLog({operationStr:operationStr})
                }
            })
    }
}