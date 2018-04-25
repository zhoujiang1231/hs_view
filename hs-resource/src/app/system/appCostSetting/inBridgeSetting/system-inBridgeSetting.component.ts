import {Component, OnInit} from '@angular/core'
import {MatDialog} from '@angular/material'
import appAlert from '../../../utils/alert'
import {LocalStorage} from "../../../core/services/localstorage.service";
import {Router} from "@angular/router";
import {SysinBridgeSettingService} from "./sys-inBridgeSetting.service";
import {SysOperationLogService} from "../../operationLog/sys-operationLog.service";
import {SysCustomerManageService} from "../../customerManage/sys-customerManage.service";

@Component({
    selector: 'app-system-inBridgeSetting',
    templateUrl: 'system-inBridgeSetting.component.html',
    styleUrls: ['system-inBridgeSetting.component.less']
})

export class SysteminBridgeSettingComponent implements OnInit {
    inBridgeSettingData: any[] = []
    addAppCostSettingParams: any = {}
    updateinBridgeSettingDataParams: any[] = []
    updateinBridgeSettingParams: any ={}
    beforeUpdate
    params: any = {limit: 10, start: 0}
    /**请求后端数据的参数**/
    loadingIndicator = true
    appIdAndName: any = {}

    constructor(private router: Router,
                private sysinBridgeSettingService:SysinBridgeSettingService,
                private sysOperationLogService: SysOperationLogService,
                private sysCustomerManageService:SysCustomerManageService) {
    }

    ngOnInit() {
        if (LocalStorage.get('appId')) {
            this.appIdAndName.appId = LocalStorage.get('appId')
            this.appIdAndName.appName = LocalStorage.get('appName')
            this.reloadInBridgeSettingData()
            this.addAppCostSettingParams.appId = LocalStorage.get('appId')
        }
    }
    /*获取呼入转接资费列表*/
    reloadInBridgeSettingData(){
        this.sysinBridgeSettingService.reloadInBridgeSettingData({appId:LocalStorage.get('appId')})
            .subscribe(page =>{
                this.inBridgeSettingData = [...page.data.list]
                this.updateinBridgeSettingDataParams = JSON.parse(JSON.stringify(this.inBridgeSettingData))
            })
    }

    /**应用资费各页面之间跳转**/
    appSettingTo(value) {
        this.router.navigate([value])
    }
    /**新增呼入转接资费**/
    addInBridgeSetting(){
        if(this.sysCustomerManageService.checkNum(this.addAppCostSettingParams.hotline)&&this.sysCustomerManageService.checkNum(this.addAppCostSettingParams.clidNumber)&&this.sysCustomerManageService.checkNum(this.addAppCostSettingParams.calleeNumber)&&this.sysCustomerManageService.checkUnitCost(this.addAppCostSettingParams.unitCost)) {
            this.addAppCostSettingParams.operationStr = LocalStorage.get('operator')+','+LocalStorage.get('operation_account')+','+LocalStorage.get('appName')+',,热线号码:'+this.addAppCostSettingParams.hotline+' 外显号码:'+this.addAppCostSettingParams.clidNumber+' 被叫号码:'+this.addAppCostSettingParams.calleeNumber+' 单价:'+this.addAppCostSettingParams.unitCost+',添加呼入转接资费'
            this.sysinBridgeSettingService.addInBridgeSetting(this.addAppCostSettingParams)
                .subscribe(page => {
                    if (page.data.result == 0) {
                        this.reloadInBridgeSettingData()
                    }
                })
        }
        else{
            appAlert.common.confirmWarning('请确保格式如下： 号码:123*或* 单价:12.3或12！')
        }
    }
    /*修改呼入转接资费*/
    updateInBridgeSetting(row){
        this.inBridgeSettingData.forEach(item =>{
            if(row.appId == item.appId && row.id == item.id) {
                this.beforeUpdate = LocalStorage.get('operator')+','+LocalStorage.get('operation_account')+','+LocalStorage.get('appName')+',热线号码:'+item.hotline+' 外显号码:'+item.clidNumber+' 被叫号码:'+item.calleeNumber+' 单价:'+item.unitCost
            }
        })
        this.updateinBridgeSettingDataParams.forEach(item=>{
            if(row.appId == item.appId && row.id == item.id){
                var operationStr = this.beforeUpdate+',热线号码:'+item.hotline+' 外显号码:'+item.clidNumber+' 被叫号码:'+item.calleeNumber+' 单价:'+item.unitCost+',修改呼入转接资费'
                this.updateinBridgeSettingParams.appId = item.appId
                this.updateinBridgeSettingParams.id = item.id
                this.updateinBridgeSettingParams.hotline = item.hotline
                this.updateinBridgeSettingParams.unitCost = item.unitCost
                this.updateinBridgeSettingParams.clidNumber = item.clidNumber
                this.updateinBridgeSettingParams.calleeNumber = item.calleeNumber
                this.updateinBridgeSettingParams.operationStr = operationStr
                this.sysinBridgeSettingService.updateInBridgeSetting(this.updateinBridgeSettingParams)
                    .subscribe(page =>{
                        if(page.data.result == 0){
                            this.reloadInBridgeSettingData()
                        }
                    })
            }
        })

    }
    /*删除呼入转接资费*/
    deleteInBridgeSetting(row){
        this.sysinBridgeSettingService.deleteInBridgeSetting(row.id)
            .subscribe(page => {
                if(page.data.result == 0){
                    this.reloadInBridgeSettingData()
                    var operationStr = LocalStorage.get('operator')+','+LocalStorage.get('operation_account')+','+LocalStorage.get('appName')+',热线号码:'+row.hotline+' 外显号码:'+row.clidNumber+' 被叫号码:'+row.calleeNumber+' 单价:'+row.unitCost+',,删除呼入转接资费'
                    this.sysOperationLogService.deleteCostSettingLog({operationStr:operationStr})
                }
            })
    }

    /*热线号码修改时数据绑定*/
    hotlineChange(event,row){
        this.updateinBridgeSettingDataParams.forEach(item=>{
            if(row.id == item.id &&row.appId == item.appId){
                item.hotline = event.srcElement.value
            }
        })
    }

    /*单价修改时数据绑定*/
    unitCostChange(event,row){
        this.updateinBridgeSettingDataParams.forEach(item=>{
            if(row.id == item.id &&row.appId == item.appId){
                item.unitCost = event.srcElement.value
            }
        })
    }
    /*外显号码修改时数据绑定*/
    clidNumberChange(event,row){
        this.updateinBridgeSettingDataParams.forEach(item=>{
            if(row.id == item.id &&row.appId == item.appId){
                item.clidNumber = event.srcElement.value
            }
        })
    }

    /*被叫号码修改时数据绑定*/
    calleeNumberChange(event,row){
        this.updateinBridgeSettingDataParams.forEach(item=>{
            if(row.id == item.id &&row.appId == item.appId){
                item.calleeNumber = event.srcElement.value
            }
        })
    }
}