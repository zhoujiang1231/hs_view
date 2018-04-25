import {Component, OnInit} from '@angular/core'
import {MatDialog} from '@angular/material'
import appAlert from '../../utils/alert'
import {SysPaylogsService} from "./sys-paylogs.service";
import {SysUserService} from "../user/sys-user.service";
import {LocalStorage} from "../../core/services/localstorage.service";
import {Router} from "@angular/router";
import {TypeaheadMatch} from "ngx-bootstrap";
@Component({
    selector: 'app-system-paylogs',
    templateUrl: 'system-paylogs.component.html',
    styleUrls: ['system-paylogs.component.less']
})

export class SystemPaylogsComponent implements OnInit {
    sysPaylogsData: any[] = []
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
    operateTypeDesc
    rolePermission
    user

    constructor(public _dialog: MatDialog,
                private router: Router,
                private sysPaylogsService: SysPaylogsService,
                private sysUserService: SysUserService) {
        this.sysPaylogsData = this.sysPaylogsService.sysPaylogsData
    }

    ngOnInit() {
        this.rolePermission = LocalStorage.get('type')
        this.user = LocalStorage.get('user')
        if(this.rolePermission == 11 || this.rolePermission == 5 || this.rolePermission == 4) {
            this.sysUserService.reloadSysUser()
                .subscribe(page => {
                    this.customerDate = [...page.data.list]
                })
            this.sysUserService.reloadCustomerShortName()
                .subscribe(page => {
                    this.customerShortName = [...page.data.list]
                })
        }
        if(this.rolePermission == 3) {
            this.params.accountId = this.user.id
            this.reloadPaylogsData()
        }
        this.operateTypeDesc = ['','到账充值','充值赠送','充值撤销','扣费','客户调账']
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

    /**加载 消费日志 数据**/
    reloadPaylogsData() {
        this.isSpinner = 1
        this.loadingIndicator = true
        this.sysPaylogsService.reloadPaylogsData(this.params)
            .subscribe(page => {
                this.totalCount = page.data.page.totalCount
                this.isSpinner = 0
                if (page.data.result === '0') {
                    this.isSpinner = 0
                    this.isPermission = 1
                    this.sysPaylogsData = [...page.data.list]
                    this.formatData(this.sysPaylogsData)
                    this.loadingIndicator = false
                    this.isPermission = 1
                }
            })
    }
    formatData(rows){
        rows.forEach(item =>{
            if(item.operateType === 4){
                var day = new Date(item.createTime)
                day.setMonth(day.getMonth()-1)
                var year = day.getFullYear()
                var month = (day.getMonth()+1).toString()
                if(month.length==1){
                    month = '0'+month
                }
                item.operateTypeDesc = this.operateTypeDesc[item.operateType]+year+'-'+month
            }
            else {
                item.operateTypeDesc = this.operateTypeDesc[item.operateType]
            }
        })
    }

    /**修改每页展示的数据条数pageSize**/
    getLimit(event) {
        Object.assign(this.params, {limit: event})
        this.reloadPaylogsData()
    }

    getDetail(row){
        LocalStorage.set('paysLogDetailId',row.vlinkAccountId)
        LocalStorage.set('paysLogCreateTime',row.createTime)
        this.router.navigate(['/index/paylogs/deductTable'])
    }
}
