import {Component, OnInit} from '@angular/core'
import {MatDialog} from '@angular/material'
import appAlert from '../../../utils/alert'
import {LocalStorage} from "../../../core/services/localstorage.service";
import {Router} from "@angular/router";
import {SysOtherSettingService} from "./sys-otherSetting.service";
import {observable} from "mobx-angular";
import {FlatpickrOptions} from "ng2-flatpickr";
import Russian from 'flatpickr/dist/l10n/zh.js'
import * as moment from "moment";

@Component({
    selector: 'app-system-otherSetting',
    templateUrl: 'system-otherSetting.component.html',
    styleUrls: ['system-otherSetting.component.less']
})

export class SystemOtherSettingComponent implements OnInit {
    vosSettingData: any = {}
    minCostSettingData: any  = {}
    currentMinCostSettingData: any = {}
    addVosParams: any = {}
    addMinCostParams: any = {}
    before_updateVos
    before_updateValue
    before_updateMinCost
    before_updateMinCostValue
    /**请求后端数据的参数**/
    loadingIndicator = true
    appIdAndName: any = {}
    dateRangeOptions: FlatpickrOptions = {
        locale: Russian.zh,
        enableTime: false,
        noCalendar: false,
        enableSeconds: false, // disabled by default
        time_24hr: false, // AM/PM time picker is used by default
        dateFormat: 'Y-m',
    }
    startTimeOptions

    constructor(private router: Router,
                private sysotherSettingService: SysOtherSettingService) {
        this.minCostSettingData = this.sysotherSettingService.minCostSettingData
    }

    ngOnInit() {
        if (LocalStorage.get('appId')) {
            this.appIdAndName.appId = LocalStorage.get('appId')
            this.appIdAndName.appName = LocalStorage.get('appName')
            this.addVosParams.appId = LocalStorage.get('appId')
            this.addMinCostParams.appId = LocalStorage.get('appId')
            this.reloadCurrentMinCost()
            this.reloadVosData()
            this.reloadMinCostData()
            if(this.minCostSettingData.remark) {
                this.startTimeOptions = Object.assign({}, this.dateRangeOptions,
                    {defaultDate: new Date(this.minCostSettingData.remark)}, {
                        onChange: event => {
                            this.minCostSettingData.remark = moment(event[0]).format('YYYY-MM')
                        }
                    })
            }else{
                this.startTimeOptions = Object.assign({}, this.dateRangeOptions,
                    {}, {
                        onChange: event => {
                            this.minCostSettingData.remark = moment(event[0]).format('YYYY-MM')
                        }
                    })
            }
        }
    }


    /*获取vos资费列表*/
    reloadVosData() {
        this.sysotherSettingService.reloadvosSettingData({appId: LocalStorage.get('appId')})
            .subscribe(page => {
                this.vosSettingData = {...page.data.data}
                this.before_updateVos = LocalStorage.get('operator') + ',' + LocalStorage.get('operation_account') + ',' + LocalStorage.get('appName')
                if(this.vosSettingData.value){
                    this.before_updateVos += ',单价:'+this.vosSettingData.value
                    this.before_updateValue = this.vosSettingData.value
                }
                else{
                    this.before_updateVos += ','
                }
            })
    }

    /*获取应用最低月消列表*/
    reloadMinCostData() {
        this.sysotherSettingService.reloadminCost({appId: LocalStorage.get('appId')})
            .subscribe(page => {
                this.minCostSettingData = {...page.data.data}
                this.before_updateMinCost = LocalStorage.get('operator') + ',' + LocalStorage.get('operation_account') + ',' + LocalStorage.get('appName')
                if(this.minCostSettingData.remark || this.minCostSettingData.value){
                    this.before_updateMinCost += ',最低月消费:'+this.minCostSettingData.value+' 开始月份:'+this.minCostSettingData.remark
                    this.before_updateMinCostValue = this.minCostSettingData.remark
                    this.startTimeOptions = Object.assign({}, this.dateRangeOptions,
                        {defaultDate:new Date(this.minCostSettingData.remark)}, {
                            onChange: event => {
                                this.minCostSettingData.remark = moment(event[0]).format('YYYY-MM')
                            }
                        })
                }
                else{
                    this.before_updateMinCost += ','
                }
            })
    }
    /*获取应用当前月低消*/
    reloadCurrentMinCost() {
        this.sysotherSettingService.reloadCurrentMinCost({appId: LocalStorage.get('appId')})
            .subscribe(page => {
                this.currentMinCostSettingData = {...page.data.data}
                this.before_updateMinCost = LocalStorage.get('operator') + ',' + LocalStorage.get('operation_account') + ',' + LocalStorage.get('appName')+',最低月消费:'+this.minCostSettingData.value+' 开始月份:'+this.minCostSettingData.remark
            })
    }

    /*修改vos费*/
    updateVos(){
        var operationStr = operationStr = this.before_updateVos + ',单价:' + this.vosSettingData.value
        if(this.before_updateValue){
            operationStr += ',修改VOS资费'
        }
        else {
            operationStr += ',添加VOS资费'
        }
        this.sysotherSettingService.updatevosSetting({appId:LocalStorage.get('appId'),vosUnitCost:this.vosSettingData.value,operationStr:operationStr})
            .subscribe(page => {
                if(page.data.result == 0){
                    this.reloadVosData()
                }
            })
    }
    /*修改应用最低月消费费*/
    updateMinCost(){
        var operationStr = this.before_updateMinCost+ ',最低月消费:' + this.minCostSettingData.value+' 开始月份'+this.minCostSettingData.remark
        if(this.before_updateMinCostValue){
            operationStr += ',修改应用最低月消费'
        }
        else {
            operationStr += ',添加应用最低月消费'
        }
        this.sysotherSettingService.updateminCost({appId:LocalStorage.get('appId'),minCost:this.minCostSettingData.value,minCostStartMonth:this.minCostSettingData.remark,operationStr:operationStr})
            .subscribe(page => {
                if(page.data.result == 0){
                    this.reloadMinCostData()
                }
            })
    }

    /**应用资费各页面之间跳转**/
    appSettingTo(value) {
        this.router.navigate([value])
    }
    /*跳转应用低消配置界面*/
    getAllMinCost(){
        this.router.navigate(['/index/numberCostSetting/inMinCostSetting'])
    }
}