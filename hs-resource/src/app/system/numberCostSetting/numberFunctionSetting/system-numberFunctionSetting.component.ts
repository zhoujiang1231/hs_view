import {Component, OnInit} from '@angular/core'
import {MatDialog} from '@angular/material'
import appAlert from '../../../utils/alert'
import {LocalStorage} from "../../../core/services/localstorage.service";
import {Router} from "@angular/router";
import {SysNumberFunctionSettingService} from "./sys-numberFunctionSetting.service";
import {observable} from "mobx-angular";
import {FlatpickrOptions} from "ng2-flatpickr";
import Russian from 'flatpickr/dist/l10n/zh.js'
import * as moment from "moment";
import {EditInMinCostSettingDialogComponent} from "../inMinCostSetting/edit-inMinCostSetting.dialog";

@Component({
    selector: 'app-system-numberFunctionSetting',
    templateUrl: 'system-numberFunctionSetting.component.html',
    styleUrls: ['system-numberFunctionSetting.component.less']
})

export class SystemNumberFunctionSettingComponent implements OnInit {
    params: any = {start:0,limit:10}
    totalCount = 0
    numberFunctionSettingData: any[] = []
    before_updateVos
    before_updateMinCost
    updateNumberFunctionBatch: any = {}
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
                private _dialog:MatDialog,
                private sysNumberFunctionSettingService: SysNumberFunctionSettingService) {
        this.startTimeOptions = Object.assign({}, this.dateRangeOptions,
            {}, {
                onChange: event => {
                    this.updateNumberFunctionBatch.startMonth = moment(event[0]).format('YYYY-MM')
                }
            })
    }

    ngOnInit() {
        if (LocalStorage.get('appId')) {
            this.params.appId = LocalStorage.get('appId')
            this.appIdAndName.appId = LocalStorage.get('appId')
            this.updateNumberFunctionBatch.appId = LocalStorage.get('appId')
            this.appIdAndName.appName = LocalStorage.get('appName')
            this.reloadNumberFunctionData({appId: LocalStorage.get('appId')})
        }
    }

     search() {
        if(this.params.areaCode){
            this.params.areaCode = this.params.areaCode.trim()
        }
         if(this.params.trunk){
             this.params.trunk = this.params.trunk.trim()
         }
        this.reloadNumberFunctionData({appId: LocalStorage.get('appId'), areaCode: this.params.areaCode,trunk:this.params.trunk,start:this.params.start,limit:this.params.limit})
        this.updateNumberFunctionBatch.areaCode = this.params.areaCode
         this.updateNumberFunctionBatch.trunk = this.params.trunk
    }

    /**修改每页展示的数据条数pageSize**/
    getLimit(event) {
        Object.assign(this.params, {limit: event})
        this.search()
    }

    importNumberFromVlink() {
        this.sysNumberFunctionSettingService.importNumberFromVlink({appId: LocalStorage.get('appId')})
            .subscribe(page => {
                if(page.data.result == 0){
                    this.reloadNumberFunctionData({appId: LocalStorage.get('appId'), areaCode: this.params.areaCode,trunk:this.params.trunk})
                }
            })
    }

    /*获取号码功能费列表*/
    reloadNumberFunctionData(params) {
        this.sysNumberFunctionSettingService.reloadNumberFunctionSettingData(params)
            .subscribe(page => {
                this.totalCount = page.data.page.totalCount
                this.numberFunctionSettingData = [...page.data.list]
            })
    }


    /*修改号码功能费*/
    updatenumberFunction(row) {
        const temRow = Object.assign({}, row)
        const config = EditInMinCostSettingDialogComponent.config
        temRow.updateId = 1
        temRow.cost = temRow.cost.toString()
        config.data = temRow
        let dialogRef = this._dialog.open(EditInMinCostSettingDialogComponent, config)
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result && result !== 'cancel') {
                this.reloadNumberFunctionData({appId: LocalStorage.get('appId'), hotline: this.updateNumberFunctionBatch.hotline})
            }
            config.data = {}
            dialogRef = null
        })
    }

    /*批量修改*/
    updateBatch() {
        var operationStr = LocalStorage.get('operator') + ',' + LocalStorage.get('operation_account') + ',' + LocalStorage.get('appName') + ',,低消:' + this.updateNumberFunctionBatch.minCost + ' 起始月份:' + this.updateNumberFunctionBatch.startMonth + ',批量修改号码功能费'
        if(this.updateNumberFunctionBatch.areaCode){
            operationStr += '区号:'+this.updateNumberFunctionBatch.areaCode
        }
        if(this.updateNumberFunctionBatch.trunk){
            operationStr += '号码:'+this.updateNumberFunctionBatch.trunk
        }
        this.updateNumberFunctionBatch.operationStr = operationStr
        this.sysNumberFunctionSettingService.updateNumberFunctionSetting(this.updateNumberFunctionBatch)
            .subscribe(page => {
                if (page.data.result == 0) {
                    this.reloadNumberFunctionData({appId: LocalStorage.get('appId'), areaCode: this.params.areaCode,trunk:this.params.trunk})
                }
            })
    }

    /**应用资费各页面之间跳转**/
    appSettingTo(value) {
        this.router.navigate([value])
    }
}