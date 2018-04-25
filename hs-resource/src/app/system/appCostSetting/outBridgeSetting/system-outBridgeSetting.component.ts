import {Component, OnInit} from '@angular/core'
import {MatDialog} from '@angular/material'
import appAlert from '../../../utils/alert'
import {LocalStorage} from "../../../core/services/localstorage.service";
import {Router} from "@angular/router";
import {SysoutBridgeSettingService} from "./sys-outBridgeSetting.service";
import {SysOperationLogService} from "../../operationLog/sys-operationLog.service";
import {SysCustomerManageService} from "../../customerManage/sys-customerManage.service";

@Component({
    selector: 'app-system-outBridgeSetting',
    templateUrl: 'system-outBridgeSetting.component.html',
    styleUrls: ['system-outBridgeSetting.component.less']
})

export class SystemoutBridgeSettingComponent implements OnInit {
    outBridgeSettingData: any[] = []
    addAppCostSettingParams: any = {}
    updateoutBridgeSettingDataParams: any[] = []
    updateoutBridgeSettingParams: any ={}
    beforeUpdate
    params: any = {limit: 10, start: 0}
    /**请求后端数据的参数**/
    loadingIndicator = true
    appIdAndName: any = {}

    constructor(private router: Router,
                private sysoutBridgeSettingService:SysoutBridgeSettingService,
                private sysCustomerManageService:SysCustomerManageService,
                private sysOperationLogService:SysOperationLogService) {
    }

    ngOnInit() {
        if (LocalStorage.get('appId')) {
            this.appIdAndName.appId = LocalStorage.get('appId')
            this.appIdAndName.appName = LocalStorage.get('appName')
            this.reloadOutBridgeSettingData()
            this.addAppCostSettingParams.appId = LocalStorage.get('appId')
        }
    }
    /*获取外呼转接资费列表*/
    reloadOutBridgeSettingData(){
        this.sysoutBridgeSettingService.reloadOutBridgeSettingData({appId:LocalStorage.get('appId')})
            .subscribe(page =>{
                this.outBridgeSettingData = [...page.data.list]
                this.updateoutBridgeSettingDataParams = JSON.parse(JSON.stringify(this.outBridgeSettingData))
            })
    }

    /**应用资费各页面之间跳转**/
    appSettingTo(value) {
        this.router.navigate([value])
    }
    /**新增外呼转接资费**/
    addOutBridgeSetting(){
        if(this.sysCustomerManageService.checkNum(this.addAppCostSettingParams.clidNumber)&&this.sysCustomerManageService.checkNum(this.addAppCostSettingParams.calleeNumber)&&this.sysCustomerManageService.checkUnitCost(this.addAppCostSettingParams.unitCost)) {
            this.addAppCostSettingParams.operationStr = LocalStorage.get('operator')+','+LocalStorage.get('operation_account')+','+LocalStorage.get('appName')+',,外显号码:'+this.addAppCostSettingParams.clidNumber+' 被叫号码:'+this.addAppCostSettingParams.calleeNumber+' 单价:'+this.addAppCostSettingParams.unitCost+',添加外呼转接资费'
            this.sysoutBridgeSettingService.addOutBridgeSetting(this.addAppCostSettingParams)
                .subscribe(page => {
                    if (page.data.result == 0) {
                        this.reloadOutBridgeSettingData()
                    }
                })
        }
        else{
            appAlert.common.confirmWarning('请确保格式如下： 热线号码:123*或* 单价:12.3或12！')
        }
    }
    /*修改外呼转接资费*/
    updateOutBridgeSetting(row){
        this.outBridgeSettingData.forEach(item =>{
            if(row.appId == item.appId && row.id == item.id) {
                this.beforeUpdate = LocalStorage.get('operator')+','+LocalStorage.get('operation_account')+','+LocalStorage.get('appName')+',外显号码:'+item.clidNumber+' 被叫号码:'+item.calleeNumber+' 单价:'+item.unitCost
            }
        })
        this.updateoutBridgeSettingDataParams.forEach(item=>{
            if(row.appId == item.appId && row.id == item.id){
                var operationStr = this.beforeUpdate+',外显号码:'+item.clidNumber+' 被叫号码:'+item.calleeNumber+' 单价:'+item.unitCost+',修改外呼转接资费'

                this.updateoutBridgeSettingParams.appId = item.appId
                this.updateoutBridgeSettingParams.id = item.id
                this.updateoutBridgeSettingParams.unitCost = item.unitCost
                this.updateoutBridgeSettingParams.clidNumber = item.clidNumber
                this.updateoutBridgeSettingParams.calleeNumber = item.calleeNumber
                this.updateoutBridgeSettingParams.operationStr = operationStr
                this.sysoutBridgeSettingService.updateOutBridgeSetting(this.updateoutBridgeSettingParams)
                    .subscribe(page =>{
                        if(page.data.result == 0){
                            this.reloadOutBridgeSettingData()
                        }
                    })
            }
        })

    }
    /*单价修改时数据绑定*/
    unitCostChange(event,row){
        this.updateoutBridgeSettingDataParams.forEach(item=>{
            if(row.id == item.id &&row.appId == item.appId){
                item.unitCost = event.srcElement.value
            }
        })
    }
    /*外显号码修改时数据绑定*/
    clidNumberChange(event,row){
        this.updateoutBridgeSettingDataParams.forEach(item=>{
            if(row.id == item.id &&row.appId == item.appId){
                item.clidNumber = event.srcElement.value
            }
        })
    }

    /*被叫号码修改时数据绑定*/
    calleeNumberChange(event,row){
        this.updateoutBridgeSettingDataParams.forEach(item=>{
            if(row.id == item.id &&row.appId == item.appId){
                item.calleeNumber = event.srcElement.value
            }
        })
    }
    /*删除外呼转接资费*/
    deleteOutBridgeSetting(row){
        this.sysoutBridgeSettingService.deleteOutBridgeSetting(row.id)
            .subscribe(page => {
                if(page.data.result == 0){
                    this.reloadOutBridgeSettingData()
                    var operationStr = LocalStorage.get('operator')+','+LocalStorage.get('operation_account')+','+LocalStorage.get('appName')+',外显号码:'+row.clidNumber+' 被叫号码:'+row.calleeNumber+' 单价:'+row.unitCost+',,删除外呼转接资费'
                    this.sysOperationLogService.deleteCostSettingLog({operationStr:operationStr})
                }
            })
    }
}