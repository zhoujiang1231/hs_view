import {Component, OnInit} from '@angular/core'
import {MatDialog} from '@angular/material'
import appAlert from '../../utils/alert'
import {SysVlinkAppService} from "./sys-vlinkApp.service";
import {FlatpickrOptions} from "ng2-flatpickr";
import Russian from 'flatpickr/dist/l10n/zh.js'
import * as moment from 'moment'

@Component({
    selector: 'app-system-product',
    templateUrl: 'system-vlinkApp.component.html',
    styleUrls: ['system-vlinkApp.component.less']
})

export class SystemVlinkAppComponent implements OnInit {
    sysVlinkAppData: any[] = []
    params: any = {limit: 10, start: 0}
    /**请求后端数据的参数**/
    totalCount = 0
    /*总数据条数，设置默认是0*/
    loadingIndicator = true
    isPermission = 1// 是否有权限
    isSpinner // 加载进度
    statusDesc //应用状态 1上线 2测试 3注销 4停机
    safetyLevelDesc
    contractCountDesc
    dateOptions: FlatpickrOptions = {
        locale: Russian.zh,
        enableTime: false,
        noCalendar: false,
        enableSeconds: false, // disabled by default
        time_24hr: false, // AM/PM time picker is used by default
        dateFormat: 'Y-m-d',
        maxDate:'today'
    }
    createTimeLeft
    createTimeRight
    uptimeLeft
    uptimeRight

    constructor(public _dialog: MatDialog,
                private sysVlinkAppService: SysVlinkAppService) {
        this.createTimeLeft = Object.assign({}, this.dateOptions, {
            onChange: event => {
                if(!event[0]){
                    this.params.createTimeLeft=null
                }
                else {
                    this.params.createTimeLeft = moment(event[0]).format('YYYY-MM-DD')
                }
            }
        })
        this.createTimeRight = Object.assign({}, this.dateOptions, {
            onChange: event => {
                if(!event[0]){
                    this.params.createTimeRight=null
                }
                else {
                    this.params.createTimeRight = moment(event[0]).format('YYYY-MM-DD')
                }
            }
        })
        this.uptimeLeft = Object.assign({}, this.dateOptions, {
            onChange: event => {
                if(!event[0]){
                    this.params.uptimeLeft=null
                }
                else {
                    this.params.uptimeLeft = moment(event[0]).format('YYYY-MM-DD')
                }
            }
        })
        this.uptimeRight = Object.assign({}, this.dateOptions, {
            onChange: event => {
                if(!event[0]){
                    this.params.uptimeRight=null
                }
                else {
                    this.params.uptimeRight = moment(event[0]).format('YYYY-MM-DD')
                }
            }
        })

    }

    ngOnInit() {
        this.statusDesc = ['','上线','测试','注销','停机']
        this.safetyLevelDesc = ['未设置','安全','一般','危险']
        this.contractCountDesc = ['未上传','已上传']
    }


    initParams() {
        this.params = {limit: 20, start: 0}
    }

    /**点查询应用信息**/
    search() {
        if(this.params.type ==='全部'){
            this.params.type == null
        }
        this.reloadVlinAppData()
    }

    /**加载 直销经理 数据**/
    reloadVlinAppData() {
        this.isSpinner = 1
        this.loadingIndicator = true
        console.log(this.params)
        this.sysVlinkAppService.reloadVlinkApp(this.params)
            .subscribe(page => {
                this.totalCount = page.data.page.totalCount
                this.isSpinner = 0
                if (page.data.result === '0') {
                    this.isSpinner = 0
                    // if (page.data.permission === 0) {
                    this.isPermission = 1
                    this.sysVlinkAppData = [...page.data.list]
                    this.formatData(this.sysVlinkAppData)
                    this.loadingIndicator = false
                    this.isPermission = 1
                    /*} else if (page.data.permission === -1) {
                      this.isPermission = 0
                    }*/
                }
            })
    }
    formatData(rows){
        rows.forEach(item =>{
            item.statusDesc = this.statusDesc[item.status]
            item.safetyLevelDesc = this.safetyLevelDesc[item.safetyLevel]
            if(item.contractCount == 0) {
                item.contractCountDesc = this.contractCountDesc[item.contractCount]
            }
            else{
                item.contractCountDesc = this.contractCountDesc[1]
            }
            if(item.safetyLevel==null){
                item.safetyLevelDesc = '未设置'
            }
        })
    }

    /**修改每页展示的数据条数pageSize**/
    getLimit(event) {
        Object.assign(this.params, {limit: event})
        this.reloadVlinAppData()
    }

}
