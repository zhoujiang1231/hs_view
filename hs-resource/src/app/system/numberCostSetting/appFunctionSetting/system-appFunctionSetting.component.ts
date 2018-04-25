import {Component, OnInit} from '@angular/core'
import {MatDialog} from '@angular/material'
import appAlert from '../../../utils/alert'
import {LocalStorage} from "../../../core/services/localstorage.service";
import {Router} from "@angular/router";
import {SysAppFunctionSettingService} from "./sys-appFunctionSetting.service";
import {observable} from "mobx-angular";
import {FlatpickrOptions} from "ng2-flatpickr";
import Russian from 'flatpickr/dist/l10n/zh.js'
import * as moment from "moment";
import {EditInMinCostSettingDialogComponent} from "../inMinCostSetting/edit-inMinCostSetting.dialog";
import {SysOperationLogService} from "../../operationLog/sys-operationLog.service";

@Component({
    selector: 'app-system-appFunctionSetting',
    templateUrl: 'system-appFunctionSetting.component.html',
    styleUrls: ['system-appFunctionSetting.component.less']
})

export class SystemAppFunctionSettingComponent implements OnInit {
    params: any = {start:0,limit:10}
    totalCount = 0
    appFunctionSettingData: any[] = []
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
                private _dialog: MatDialog,
                private sysAppFunctionSettingService: SysAppFunctionSettingService,
                private sysOperationLogService: SysOperationLogService) {
        this.startTimeOptions = Object.assign({}, this.dateRangeOptions,
            {}, {
                onChange: event => {
                    this.params.startMonth = moment(event[0]).format('YYYY-MM')
                }
            })
    }

    ngOnInit() {
        if (LocalStorage.get('appId')) {
            this.params.appId = LocalStorage.get('appId')
            this.appIdAndName.appId = LocalStorage.get('appId')
            this.appIdAndName.appName = LocalStorage.get('appName')
            this.reloadAppFunctionSettingData()
        }
    }
    /*添加功能费*/
    addAppFunctionSetting(){
        if(this.params.name == null ||this.params.cost == null || this.params.startMonth == null ||
            this.params.name == '' ||this.params.cost == '' || this.params.startMonth == ''){
            appAlert.common.confirmWarning('请填写数据!')
            return
        }
        this.params.operationStr = LocalStorage.get('operator') + ',' + LocalStorage.get('operation_account') + ',' + LocalStorage.get('appName') + ',,功能名称:' + this.params.name + ' 功能费:' + this.params.cost + ' 开始月份:' + this.params.startMonth + ',添加功能费'
        this.sysAppFunctionSettingService.addAppFunctionSetting(this.params)
            .subscribe(page => {
                if(page.data.result == 0){
                    this.reloadAppFunctionSettingData()
                }
            })

    }


    /*获取功能费列表*/
    reloadAppFunctionSettingData() {
        this.params.appId = LocalStorage.get('appId')
        this.sysAppFunctionSettingService.reloadAppFunctionSettingData(this.params)
            .subscribe(page => {
                console.log(page)
                this.appFunctionSettingData = [...page.data.list]
                this.totalCount = page.data.page.totalCount
            })
    }


    /*修改功能费*/
    updateAppFunction(row) {
        const temRow = Object.assign({}, row)
        temRow.updateId = 2
        temRow.cost = temRow.cost.toString()
        const config = EditInMinCostSettingDialogComponent.config
        config.data = temRow
        let dialogRef = this._dialog.open(EditInMinCostSettingDialogComponent, config)
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result && result !== 'cancel') {
                this.reloadAppFunctionSettingData()
            }
            config.data = {}
            dialogRef = null
        })
    }
    /*删除功能费*/
    deleteAppFunction(row){
        this.sysAppFunctionSettingService.deleteAppFunctionSetting(row.id)
            .subscribe(page =>{
                if(page.data.result == 0){
                    this.reloadAppFunctionSettingData()
                    var operationStr = LocalStorage.get('operator')+','+LocalStorage.get('operation_account')+','+LocalStorage.get('appName')+',功能名称:'+row.name+' 功能费:'+row.cost+' 开始月份:'+row.startMonth+',,删除功能费'
                    this.sysOperationLogService.deleteCostSettingLog({operationStr:operationStr})
                }
            })
    }

    /**应用资费各页面之间跳转**/
    appSettingTo(value) {
        this.router.navigate([value])
    }

    /**修改每页展示的数据条数pageSize**/
    getLimit(event) {
        Object.assign(this.params, {limit: event})
        this.reloadAppFunctionSettingData()
    }
}