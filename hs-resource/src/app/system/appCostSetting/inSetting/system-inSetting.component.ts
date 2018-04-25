import {Component, OnInit} from '@angular/core'
import {MatDialog} from '@angular/material'
import appAlert from '../../../utils/alert'
import {LocalStorage} from "../../../core/services/localstorage.service";
import {Router} from "@angular/router";
import {SysinSettingService} from "./sys-inSetting.service";
import {SysOperationLogService} from "../../operationLog/sys-operationLog.service";
import {SysOtherSettingService} from "../otherSetting/sys-otherSetting.service";
import {SysCustomerManageService} from "../../customerManage/sys-customerManage.service";

@Component({
    selector: 'app-system-inSetting',
    templateUrl: 'system-inSetting.component.html',
    styleUrls: ['system-inSetting.component.less']
})

export class SysteminSettingComponent implements OnInit {
    inSettingData: any[] = []
    updateinSettingDataParams: any[] = []
    updateinSettingParams: any ={}
    addAppCostSettingParams: any = {}
    beforeUpdate
    params: any = {limit: 10, start: 0}
    /**请求后端数据的参数**/
    loadingIndicator = true
    appIdAndName: any = {}

    constructor(private router: Router,
                private sysinSettingService:SysinSettingService,
                private sysOperationLogService:SysOperationLogService,
                private sysOtherSettingService:SysOtherSettingService,
                private sysCustomerManageService:SysCustomerManageService) {
    }

    ngOnInit() {
        if (LocalStorage.get('appId')) {
            this.appIdAndName.appId = LocalStorage.get('appId')
            this.appIdAndName.appName = LocalStorage.get('appName')
            this.reloadInSettingData()
            this.sysOtherSettingService.reloadminCost({appId: LocalStorage.get('appId')})
            this.addAppCostSettingParams.appId = LocalStorage.get('appId')
        }
    }
    /*获取呼入资费列表*/
    reloadInSettingData(){
        this.sysinSettingService.reloadInSettingData({appId:LocalStorage.get('appId')})
            .subscribe(page =>{
                this.inSettingData = [...page.data.list]
                this.updateinSettingDataParams = JSON.parse(JSON.stringify(this.inSettingData))
            })
    }

    /**应用资费各页面之间跳转**/
    appSettingTo(value) {
        this.router.navigate([value])
    }
    /**新增呼入资费**/
    addInSetting(){
        if(this.sysCustomerManageService.checkNum(this.addAppCostSettingParams.hotline)&&this.sysCustomerManageService.checkUnitCost(this.addAppCostSettingParams.unitCost)) {
            this.addAppCostSettingParams.operationStr = LocalStorage.get('operator')+','+LocalStorage.get('operation_account')+','+LocalStorage.get('appName')+',,热线号码:'+this.addAppCostSettingParams.hotline+' 单价:'+this.addAppCostSettingParams.unitCost+',添加呼入资费'
            this.sysinSettingService.addInSetting(this.addAppCostSettingParams)
                .subscribe(page => {
                    if (page.data.result == 0) {
                        this.reloadInSettingData()
                    }
                })
        }
        else{
            appAlert.common.confirmWarning('请确保格式如下： 热线号码:123*或* 单价:12.3或12！')
        }
    }

    /*修改呼入资费*/
    updateInSetting(row){
        this.inSettingData.forEach(item =>{
            if(row.appId == item.appId && row.id == item.id) {
                this.beforeUpdate = LocalStorage.get('operator')+','+LocalStorage.get('operation_account')+','+LocalStorage.get('appName')+',热线号码:'+item.hotline+' 单价:'+item.unitCost
            }
        })
        this.updateinSettingDataParams.forEach(item=>{
            if(row.appId == item.appId && row.id == item.id){
                var operationStr = this.beforeUpdate+',热线号码:'+item.hotline+' 单价:'+item.unitCost+',修改呼入资费'
                this.updateinSettingParams.appId = item.appId
                this.updateinSettingParams.id = item.id
                this.updateinSettingParams.hotline = item.hotline
                this.updateinSettingParams.unitCost = item.unitCost.toString()
                this.updateinSettingParams.operationStr = operationStr
                this.sysinSettingService.updateInSetting(this.updateinSettingParams)
                    .subscribe(page =>{
                        if(page.data.result == 0){
                            this.reloadInSettingData()
                        }
                    })
            }
        })

    }
    /*删除呼入资费*/
    deleteInSetting(row){
        this.sysinSettingService.deleteInSetting(row.id)
            .subscribe(page => {
                if(page.data.result == 0){
                    this.reloadInSettingData()
                    var operationStr = LocalStorage.get('operator')+','+LocalStorage.get('operation_account')+','+LocalStorage.get('appName')+',热线号码:'+row.hotline+' 单价:'+row.unitCost+',,删除呼入资费'
                    this.sysOperationLogService.deleteCostSettingLog({operationStr:operationStr})
                }
            })
    }
    /*热线号码修改时数据绑定*/
    hotlineChange(event,row){
        this.updateinSettingDataParams.forEach(item=>{
            if(row.id == item.id &&row.appId == item.appId){
                item.hotline = event.srcElement.value
            }
        })
    }

    /*单价修改时数据绑定*/
    unitCostChange(event,row){
        this.updateinSettingDataParams.forEach(item=>{
            if(row.id == item.id &&row.appId == item.appId){
                item.unitCost = event.srcElement.value
            }
        })
    }
}