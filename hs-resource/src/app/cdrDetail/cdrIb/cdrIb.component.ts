import {Component, OnInit} from '@angular/core'
import {SysUserService} from '../../system/user/sys-user.service'
import * as moment from 'moment'
import {FlatpickrOptions} from 'ng2-flatpickr'
import Russian from 'flatpickr/dist/l10n/zh.js'
import {CdrDetailService} from '../cdrDetail.service'
import appAlert from '../../utils/alert'
import {TypeaheadMatch} from "ngx-bootstrap";

@Component({
    selector: 'app-cdrIb',
    templateUrl: 'cdrIb.component.html',
    styleUrls: ['cdrIb.component.less']
})

export class CdrIbComponent implements OnInit {
    cdrDetailCdrIb: any[] = [] /**table数据**/
    params: any = {limit: 10, start: 0} /**请求呼入详情接口的参数**/
    paramsApp: any = {} /**请求客户对应应用接口的参数**/
    totalCount = 0 /*总数据条数，设置默认是0*/
    userIdArr : any[] = []
    accountName
    appIdArr : any[] = []
    dateOptions: FlatpickrOptions = {
        locale: Russian.zh,
        enableTime: false,
        noCalendar: false,
        enableSeconds: false, // disabled by default
        time_24hr: false, // AM/PM time picker is used by default
        dateFormat: 'Y-m-d',
        defaultDate: 'today',
        maxDate:'today'
    }
    searchDayOptions
    loadingIndicator = true
    isPermission// 是否有权限
    isSpinner = 0// 加载进度

    constructor(private cdrDetailService: CdrDetailService,
                private sysUserService: SysUserService) {
        this.searchDayOptions = Object.assign({}, this.dateOptions, {
            onChange: event => {
                this.params.rptDate = moment(event[0]).format('YYYY-MM-DD')
            }
        })
    }
    ngOnInit() {
        this.params.rptDate = moment().format('YYYY-MM-DD')
        this.sysUserService.reloadSysUser()
            .subscribe(page => {
                if (page.data.result == 0) {
                    this.userIdArr = [...page.data.list]
                }
            })
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

    /**加载 呼入详情 数据**/
    reloadOperateDailyCount() {
        this.loadingIndicator = true
        this.cdrDetailService.reloadCdrIb(this.params)
            .subscribe(page => {
                if (page.data.page != null) {
                    this.totalCount = page.data.page.totalCount
                }
                if (page.data.result === '0') {
                    // if (page.data.permission === 0) {
                    this.isSpinner = 0
                        this.cdrDetailCdrIb = [...page.data.list]
                        // this.formatData(this.cdrOb)
                        this.loadingIndicator = false
                    // } else if (page.data.permission === -1) {
                     //   this.isPermission = 0
                    // }
                }
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

    /**格式化数据：数据解析**/
    formatData(rows) {
        rows.forEach(item => {
            // console.log(item)
            item.objectName = JSON.parse(item.object)
            // this.jsonFormat(item.objectName)
        })
    }
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
}