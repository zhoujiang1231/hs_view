import {Component, OnInit} from '@angular/core'
import {SysUserService} from '../../system/user/sys-user.service'
import * as moment from 'moment'
import {FlatpickrOptions} from 'ng2-flatpickr'
import Russian from 'flatpickr/dist/l10n/zh.js'
import {CallRecordsService} from '../callRecord.service'
import appAlert from '../../utils/alert'
import {LocalStorage} from "../../core/services/localstorage.service";
import {ExportCallRecordsComponent} from "./export-callRecords.component";
import {MatDialog} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";
import {ConstantService} from "../../core/services/constant.service";

import 'rxjs/add/observable/of';
import {TypeaheadMatch} from "ngx-bootstrap";

@Component({
    selector: 'app-callRecords',
    templateUrl: 'callRecords.component.html',
    styleUrls: ['callRecords.component.less']
})

export class CallRecordsRouterComponent implements OnInit {
    callRecords: any[] = [] /**table数据**/
    callRecordsTotal: any = {billDurationsTotal:0,bridgeDurationsTotal:0}
    params: any = {limit: 10, start: 0, callType: 2} /**请求通话记录接口的参数**/
    paramsApp: any = {} /**请求客户对应应用接口的参数**/
    totalCount = 0 /*总数据条数，设置默认是0*/
    userIdArr : any[] = []
    accountName
    appIdArr : any[] = []
    downiframe:any
    dateRangeOptions: FlatpickrOptions = {
        locale: Russian.zh,
        enableTime: true,
        noCalendar: false,
        enableSeconds: true, // disabled by default
        time_24hr: true, // AM/PM time picker is used by default
        dateFormat: 'Y-m-d H:i:S',
    }
    startTimeOptions
    endTimeOptions
    loadingIndicator = true
    isPermission// 是否有权限
    isSpinner = 0// 加载进度
    rolePermission
    user
    recordSrc


    constructor(public _dialog: MatDialog,
                private callRecordService: CallRecordsService,
                private sanitizer: DomSanitizer,
                private sysUserService: SysUserService) {
        this.downiframe = this.sanitizer.bypassSecurityTrustResourceUrl('')
        this.recordSrc = this.sanitizer.bypassSecurityTrustResourceUrl('')
        this.rolePermission = LocalStorage.get('type')
        this.startTimeOptions = Object.assign({}, this.dateRangeOptions,
            {defaultDate: 'today',maxDate:'today'}, {
                onChange: event => {
                    this.params.startTime = moment(event[0]).format('YYYY-MM-DD HH:mm:ss')
                }
            })
        this.endTimeOptions = Object.assign({}, this.dateRangeOptions,
            {defaultDate: moment({hour: 23, minute: 59, seconds: 59}).format('YYYY-MM-DD HH:mm:ss'),maxDate:moment({hour: 23, minute: 59, seconds: 59}).format('YYYY-MM-DD HH:mm:ss')}, {
                onChange: event => {
                    this.params.endTime = moment(event[0]).format('YYYY-MM-DD HH:mm:ss')
                }
            })
    }

    ngOnInit() {
        this.params.startTime = moment({hour: 0}).format('YYYY-MM-DD HH:mm:ss')
        this.params.endTime = moment({hour: 23, minute: 59, seconds: 59}).format('YYYY-MM-DD HH:mm:ss')
        if(this.rolePermission == 11 || this.rolePermission == 5) {
            this.sysUserService.reloadSysUser()
                .subscribe(page =>{
                    if(page.data.result == 0){
                        this.userIdArr = [...page.data.list]
                    }
                })
        }
        if(this.rolePermission == 3){
            this.user = LocalStorage.get('user')
            this.sysUserService.reloadUserApp({accountId:this.user.accountId})
                .subscribe(page =>{
                    if(page.data.result == 0){
                        this.appIdArr = [...page.data.list]
                    }
            })
        }
    }

    typeaheadOnSelect(e: TypeaheadMatch): void {
        this.paramsApp.accountId = e.item.id
        this.getAccountApp()
        this.userIdArr.forEach(item =>{
            if(e.item.id == item.id)
                this.accountName = item.fullName
        })
    }
    typeaheadOnBlur(e: TypeaheadMatch): void {
        if(this.accountName==null||this.accountName==''){
            this.paramsApp.accountId = null
            this.params.appId = null
            this.appIdArr = null
        }
    }

    /**加载 通话记录 数据**/
    reloadOperateDailyCount() {
        this.loadingIndicator = true
        this.callRecordService.reloadcallRecords(this.params)
            .subscribe(page => {
                if (page.data.page != null) {
                    this.totalCount = page.data.page.totalCount
                }
                if (page.data.result === '0') {
                    // if (page.data.permission === 0) {
                    this.isSpinner = 0
                        this.callRecords = [...page.data.list]
                    this.callRecordsTotal = {...page.data.data}
                        // this.formatData(this.cdrOb)
                        this.loadingIndicator = false
                        this.isPermission = 1
                    // } else if (page.data.permission === -1) {
                     //   this.isPermission = 0
                    // }
                }
            })
    }

    /**导出通话记录**/
    export() {
        this.newDialog()
    }
    /**打开 新建dialog**/
    newDialog() {
        const config = ExportCallRecordsComponent.config
        config.data = {appId:this.params.appId,callType:1}
        let dialogRef = this._dialog.open(ExportCallRecordsComponent, config)
        dialogRef.afterClosed().subscribe((result: any) => {
            config.data = {appId:this.params.appId,callType:2}
            dialogRef = null
        })
    }

    /**格式化数据：数据解析**/
    formatData(rows) {
        rows.forEach(item => {
            // console.log(item)
            item.objectName = JSON.parse(item.object)
            // this.jsonFormat(item.objectName)
        })
    }

    /**获取客户下的应用**/
    getAccountApp() {
        this.params.appId = null
        this.sysUserService.reloadUserApp(this.paramsApp)
            .subscribe(page =>{
                if(page.data.result == 0){
                    this.appIdArr = [...page.data.list]
                }
            })
    }

    /*试听录音 同时打开录音播放器*/
    listenRecord(row){
        this.recordSrc = this.sanitizer.bypassSecurityTrustResourceUrl(ConstantService.vocp_api_vlink+row.recordFile+"?appId="+this.params.appId+"&timestamp="+this.callRecordsTotal.timestamp+"&sign="+this.callRecordsTotal.sign)
        let audio:HTMLAudioElement = document.getElementsByTagName('audio')[0]
        audio.style.display = 'block'
        let closeRecordButton = document.getElementById('closeRecordButton')
        closeRecordButton.style.display = 'block'
    }

    /*关闭录音播放器*/
    closeRecord(){
        let audio:HTMLAudioElement = document.getElementsByTagName('audio')[0]
        audio.style.display = 'none'
        let closeRecordButton = document.getElementById('closeRecordButton')
        closeRecordButton.style.display = 'none'
        audio.pause()
        audio.currentTime = 0
    }

    /**将json字符串格式化，分行显示**/
    // jsonFormat(json) {
    //   console.log(json)
    //   if (json.includes('{')) {}
    // }

    /**关键词搜索**/
    search() {/*time需转为int类型*/
        if (this.params.appId == null) {
            appAlert.common.confirmWarning('请选择应用，再查询！')
        }else {
            this.reloadOperateDailyCount()
        }
    }

    /**修改每页展示的数据条数pageSize**/
    getLimit(event) {
        if (this.params.appId == null) {
            appAlert.common.confirmWarning('请选择应用，再查询！')
        }else {
            Object.assign(this.params, {limit: event})
            this.reloadOperateDailyCount()
        }
    }
    /*下载录音*/
    downfile(evt,row,mark) {
        var strfile = row.recordFile+"?appId="+this.params.appId+"&timestamp="+this.callRecordsTotal.timestamp+"&sign="+this.callRecordsTotal.sign
        var oe=evt?evt:event;
        if(oe.stopPropagation) {
            oe.stopPropagation();
        }else{
            oe.cancelBubble = true;
        }
        var urll = ConstantService.vocp_api_vlink+strfile
        this.downiframe = this.sanitizer.bypassSecurityTrustResourceUrl(urll)
        // window.open(urll,'_blank')
    }
}