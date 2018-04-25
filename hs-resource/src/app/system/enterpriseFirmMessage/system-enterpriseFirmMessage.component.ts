import {Component, OnInit} from '@angular/core'
import {MatDialog} from '@angular/material'
import {SysEnterpriseFirmMessageService} from "./sys-enterpriseFirmMessage.service";
import {LocalStorage} from "../../core/services/localstorage.service";
import {SysCustomerManageService} from "../customerManage/sys-customerManage.service";
import Russian from 'flatpickr/dist/l10n/zh.js'
import {Router} from "@angular/router";
import * as moment from "moment";
import {FlatpickrOptions} from "ng2-flatpickr";
import {SysManagerManageService} from "../directManagerManage/sys-directManagerManage.service";
import {NewEnterpriseFirmMessageDialogComponent} from "./new-enterpriseFirmMessage.dialog";

@Component({
    selector: 'app-system-product',
    templateUrl: 'system-enterpriseFirmMessage.component.html',
    styleUrls: ['system-enterpriseFirmMessage.component.less']
})

export class SystemEnterpriseFirmMessageComponent implements OnInit {
    sysEnterpriseFirmMessageData: any = {}
    params: any = {limit: 10, start: 0}
    directDepartmentData: any[] =[]
    directManagerData: any[] =[]
    /**请求后端数据的参数**/
    loadingIndicator = true
    updateParams: any = {}
    statusOld
    accountNameOld
    dateRangeOptions: FlatpickrOptions = {
        locale: Russian.zh,
        enableTime: false,
        noCalendar: false,
        enableSeconds: false, // disabled by default
        time_24hr: false, // AM/PM time picker is used by default
        dateFormat: 'Y-m',
    }
    startTimeOptions
    beforeOperationStr_updateMinCost
    beforeOperationStr_updateCurrentRebate

    constructor(public _dialog: MatDialog,
                private router: Router,
                private sysCustomerManageService:SysCustomerManageService,
                private sysManagerManageService:SysManagerManageService,
                private sysEnterpriseFirmMessageService: SysEnterpriseFirmMessageService) {
        this.sysEnterpriseFirmMessageData = this.sysCustomerManageService.sysEnterpriseBasicMessageData
    }

    ngOnInit() {
        if (LocalStorage.get('accountId')) {
            this.reloadCustomerMessageData()
            this.sysEnterpriseFirmMessageData.accountId = LocalStorage.get('accountId')
            this.reloaddirectDepartmentIdAndName()
            if(this.sysEnterpriseFirmMessageData.minCostStartMonth) {
                this.startTimeOptions = Object.assign({}, this.dateRangeOptions,
                    {defaultDate: new Date(this.sysEnterpriseFirmMessageData.minCostStartMonth)}, {
                        onChange: event => {
                            this.sysEnterpriseFirmMessageData.minCostStartMonth = moment(event[0]).format('YYYY-MM')
                        }
                    })
            }
            else{
                this.startTimeOptions = Object.assign({}, this.dateRangeOptions,
                    {}, {
                        onChange: event => {
                            this.sysEnterpriseFirmMessageData.minCostStartMonth = moment(event[0]).format('YYYY-MM')
                        }
                    })
            }
        }
    }
    /*获取直销部门下拉框*/
    reloaddirectDepartmentIdAndName(){
        this.sysManagerManageService.reloaddirectDepartmentIdAndName()
            .subscribe(page =>{
                this.directDepartmentData = [...page.data.list]
                this.reloaddirectManagerIdAndName(this.sysEnterpriseFirmMessageData.parentParentId)
            })
    }
    /*更改直销部门*/
    changDirectMent(){
        this.reloaddirectManagerIdAndName(this.sysEnterpriseFirmMessageData.parentParentId)
    }
    /*获取直销经理下拉框*/
    reloaddirectManagerIdAndName(params){
        this.sysCustomerManageService.reloaddirectMangerData({directDepartmentId:params})
            .subscribe(page =>{
                this.directManagerData = [...page.data.list]
            })
    }

    reloadCustomerMessageData(){
        this.sysCustomerManageService.reloadCustomerMessageData({accountId:LocalStorage.get('accountId')})
            .subscribe(page =>{
                this.sysEnterpriseFirmMessageData = {...page.data.data}
                this.beforeOperationStr_updateMinCost = LocalStorage.get('operator')+','+LocalStorage.get('operation_account')+',,企业月低消:'+this.sysEnterpriseFirmMessageData.minCost+' 开始时间:'+this.sysEnterpriseFirmMessageData.minCostStartMonth+','
                this.beforeOperationStr_updateCurrentRebate = LocalStorage.get('operator')+','+LocalStorage.get('operation_account')+',,本月折扣:'+this.sysEnterpriseFirmMessageData.rebate+','
                this.statusOld = JSON.parse(JSON.stringify(this.sysEnterpriseFirmMessageData.status))
                this.accountNameOld = JSON.parse(JSON.stringify(this.sysEnterpriseFirmMessageData.accountName))
            })
    }

    updateEnterpriseFirmMessage(){
        this.updateCurrentRebate()
        this.updateMinCost()
        this.updateParams = {accountId: LocalStorage.get('accountId'),
            shortName:this.sysEnterpriseFirmMessageData.shortName,
            accountPwd:this.sysEnterpriseFirmMessageData.accountPwd,
            parentId:this.sysEnterpriseFirmMessageData.parentId.toString(),
            level:this.sysEnterpriseFirmMessageData.level.toString()}
        /**如果状态不变 就不传status字段**/
        if(this.statusOld != this.sysEnterpriseFirmMessageData.status){
           this.updateParams.status = this.sysEnterpriseFirmMessageData.status.toString()
        }
        /**如果登录名不变 就不传accountName字段**/
        if(this.accountNameOld != this.sysEnterpriseFirmMessageData.accountName){
            this.updateParams.accountName = this.sysEnterpriseFirmMessageData.accountName
        }
        this.sysCustomerManageService.updateEnterpriseBasicMessage(this.updateParams)
            .subscribe(page => {
                if(page.data.result == 0){
                    this.reloadCustomerMessageData()
                }
            })
    }


    initParams() {
        this.params = {limit: 20, start: 0}
    }

    /**企业各页面之间跳转**/
    customerManageTo(value) {
        this.router.navigate([value])
    }
    /*修改企业月低消*/
    updateMinCost(){
        var operationStr = this.beforeOperationStr_updateMinCost+'企业月低消:'+this.sysEnterpriseFirmMessageData.minCost+' 开始时间:'+this.sysEnterpriseFirmMessageData.minCostStartMonth+',修改企业月低消'
        this.sysEnterpriseFirmMessageService.updateMinCost({accountId:LocalStorage.get('accountId'),minCost:this.sysEnterpriseFirmMessageData.minCost,minCostStartMonth:this.sysEnterpriseFirmMessageData.minCostStartMonth,operationStr:operationStr})
    }
    /*修改本月折扣*/
    updateCurrentRebate(){
        var operationStr = this.beforeOperationStr_updateCurrentRebate+'本月折扣:'+this.sysEnterpriseFirmMessageData.rebate+',修改企业本月折扣'
        this.sysEnterpriseFirmMessageService.updateCurrentRebate({accountId:LocalStorage.get('accountId'),currentRebate:this.sysEnterpriseFirmMessageData.rebate,operationStr:operationStr})
    }
    /*查看企业当前月低消*/
    getCurrentMinCost(){
        const config = NewEnterpriseFirmMessageDialogComponent.config
        let dialogRef = this._dialog.open(NewEnterpriseFirmMessageDialogComponent, config)
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result && result !== 'cancel') {
            }
            config.data = {}
            dialogRef = null
        })
    }
}