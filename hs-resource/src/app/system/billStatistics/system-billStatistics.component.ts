import {Component, OnInit} from '@angular/core'
import {MatDialog} from '@angular/material'
import appAlert from '../../utils/alert'
import {SysBillStatisticsService} from "./sys-billStatistics.service";
import {SysUserService} from "../user/sys-user.service";
import {TypeaheadMatch} from "ngx-bootstrap";

@Component({
    selector: 'app-system-product',
    templateUrl: 'system-billStatistics.component.html',
    styleUrls: ['system-billStatistics.component.less']
})

export class SystemBillStatisticsComponent implements OnInit {
    sysBillStatisticsData: any[] = []
    params: any = {limit: 10, start: 0}
    /**请求后端数据的参数**/
    totalCount = 0
    /*总数据条数，设置默认是0*/
    loadingIndicator = true
    isPermission = 1// 是否有权限
    isSpinner // 加载进度
    customerDate: any[] = []
    customerShortName: any[] = []
    accountName
    accountShortName

    constructor(public _dialog: MatDialog,
                private sysBillStatisticsService: SysBillStatisticsService,
                private sysUserService: SysUserService) {
    }

    ngOnInit() {
        this.sysUserService.reloadSysUser()
            .subscribe(page => {
                this.customerDate = [...page.data.list]
            })
        this.sysUserService.reloadCustomerShortName()
            .subscribe(page => {
                this.customerShortName = [...page.data.list]
            })
    }

    typeaheadOnSelect(e: TypeaheadMatch): void {
        this.params.accountId = e.item.id
        this.customerDate.forEach(item =>{
            if(e.item.id == item.id)
                this.accountName = item.fullName
        })
        this.customerShortName.forEach(item =>{
            if(e.item.id == item.id)
                this.accountShortName = item.shortName
        })
    }
    typeaheadOnBlur(e: TypeaheadMatch): void {
        if(this.accountName==null||this.accountName==''||this.accountShortName==null||this.accountShortName==''){
            this.params.accountId = null
            this.accountName = null
            this.accountShortName = null
        }
    }

    /**点击 顶部右侧"新建"按钮**/
    search() {
        if(this.params.accountId) {
            this.reloadPaylogsData()
        }else{
            appAlert.common.confirmWarning('请选择企业!')
        }
    }

    /**加载 预消费日志 数据**/
    reloadPaylogsData() {
        this.isSpinner = 1
        this.loadingIndicator = true
        this.sysBillStatisticsService.reloadPaylogsData(this.params)
            .subscribe(page => {
                this.totalCount = page.data.page.totalCount
                this.isSpinner = 0
                if (page.data.result === '0') {
                    this.isSpinner = 0
                    this.isPermission = 1
                    this.sysBillStatisticsData = [...page.data.list]
                    this.loadingIndicator = false
                    this.isPermission = 1
                }
            })
    }

    /**修改每页展示的数据条数pageSize**/
    getLimit(event) {
        Object.assign(this.params, {limit: event})
        this.reloadPaylogsData()
    }

}
