import {Component, OnInit} from '@angular/core'
import {MatDialog} from '@angular/material'
import appAlert from '../../../utils/alert'
import {LocalStorage} from "../../../core/services/localstorage.service";
import {Router} from "@angular/router";
import {SysInMinCostSettingService} from "./sys-inMinCostSetting.service";
import {observable} from "mobx-angular";
import {FlatpickrOptions} from "ng2-flatpickr";
import Russian from 'flatpickr/dist/l10n/zh.js'
import * as moment from "moment";
import {NewDirectDepartmentManageDialogComponent} from "../../directDepartmentManage/new-directDepartmentManage.dialog";
import {EditInMinCostSettingDialogComponent} from "./edit-inMinCostSetting.dialog";

@Component({
    selector: 'app-system-inMinCostSetting',
    templateUrl: 'system-inMinCostSetting.component.html',
    styleUrls: ['system-inMinCostSetting.component.less']
})

export class SystemInMinCostSettingComponent implements OnInit {
    params: any = {start:0,limit:10}
    totalCount = 0
    inMinCostSettingData: any[] = []
    updateInMinCostDataParams: any[] = []
    updateInMinCostParams: any ={}
    updateInMinCostBatch: any = {}
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
                public _dialog: MatDialog,
                private sysInMinCostSettingService: SysInMinCostSettingService) {
        this.startTimeOptions = Object.assign({}, this.dateRangeOptions,
            {}, {
                onChange: event => {
                    this.updateInMinCostBatch.startMonth = moment(event[0]).format('YYYY-MM')
                }
            })
    }

    ngOnInit() {
        if (LocalStorage.get('appId')) {
            this.appIdAndName.appId = LocalStorage.get('appId')
            this.updateInMinCostBatch.appId = LocalStorage.get('appId')
            this.appIdAndName.appName = LocalStorage.get('appName')
            this.reloadInMinCostSettingData({appId: LocalStorage.get('appId')})
        }
    }

    search() {
        if(this.params.hotline){
            this.params.hotline = this.params.hotline.trim()
        }
        this.reloadInMinCostSettingData({appId: LocalStorage.get('appId'), hotline: this.params.hotline,start:this.params.start,limit:this.params.limit})
        this.updateInMinCostBatch.hotline = this.params.hotline
    }

    /**修改每页展示的数据条数pageSize**/
    getLimit(event) {
        Object.assign(this.params, {limit: event})
        this.search()
    }

    importNumberFromVlink() {
        this.sysInMinCostSettingService.importNumberFromVlink({appId: LocalStorage.get('appId')})
            .subscribe(page => {
                if(page.data.result == 0){
                    this.reloadInMinCostSettingData({appId: LocalStorage.get('appId'), hotline: this.params.hotline})
                }
            })
    }

    /*获取呼入低消列表*/
    reloadInMinCostSettingData(params) {
        this.sysInMinCostSettingService.reloadInMinCostSettingData(params)
            .subscribe(page => {
                this.totalCount = page.data.page.totalCount
                this.inMinCostSettingData = [...page.data.list]
                this.updateInMinCostDataParams = JSON.parse(JSON.stringify(this.inMinCostSettingData))
            })
    }


    /*修改呼入低消资费*/
    updateInMinCost(row) {
        const temRow = Object.assign({}, row)
        temRow.updateId = 0
        temRow.minCost = temRow.minCost.toString()
        const config = EditInMinCostSettingDialogComponent.config
        config.data = temRow
        let dialogRef = this._dialog.open(EditInMinCostSettingDialogComponent, config)
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result && result !== 'cancel') {
                this.reloadInMinCostSettingData({appId: LocalStorage.get('appId'), hotline: this.updateInMinCostBatch.hotline})
            }
            config.data = {}
            dialogRef = null
        })
    }
    /*批量修改*/
    updateBatch() {
        var operationStr = LocalStorage.get('operator') + ',' + LocalStorage.get('operation_account') + ',' + LocalStorage.get('appName') + ',,低消:' + this.updateInMinCostBatch.minCost + ' 起始月份:' + this.updateInMinCostBatch.startMonth + ',批量修改呼入低消'
        if(this.updateInMinCostBatch.hotline){
            operationStr += '热线号码为:'+this.updateInMinCostBatch.hotline
        }
        this.updateInMinCostBatch.operationStr = operationStr
        this.sysInMinCostSettingService.updateInMinCostSetting(this.updateInMinCostBatch)
            .subscribe(page => {
                if (page.data.result == 0) {
                    this.reloadInMinCostSettingData({appId: LocalStorage.get('appId'), hotline: this.params.hotline})
                }
            })
    }

    /**应用资费各页面之间跳转**/
    appSettingTo(value) {
        this.router.navigate([value])
    }
}