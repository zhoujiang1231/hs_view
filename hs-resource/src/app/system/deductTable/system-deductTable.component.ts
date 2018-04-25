import {Component, OnInit} from '@angular/core'
import {MatDialog} from '@angular/material'
import appAlert from '../../utils/alert'
import {SysDeductTableService} from "./sys-deductTable.service";
import {SysUserService} from "../user/sys-user.service";
import {LocalStorage} from "../../core/services/localstorage.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-system-deductTable',
    templateUrl: 'system-deductTable.component.html',
    styleUrls: ['system-deductTable.component.less']
})

export class SystemDeductTableComponent implements OnInit {
    sysDeductTableData: any[] = []
    params: any = {limit: 10, start: 0}
    /**请求后端数据的参数**/
    totalCount = 0
    /*总数据条数，设置默认是0*/
    loadingIndicator = true
    isPermission = 1// 是否有权限
    isSpinner // 加载进度
    rolePermission
    user

    constructor(private router: Router,
                private sysDeductTableService: SysDeductTableService,
                private sysUserService: SysUserService) {
        /*this.sysDeductTableData = this.sysDeductTableService.sysDeductTableData*/
    }

    ngOnInit() {
        if(LocalStorage.get('paysLogDetailId')&&LocalStorage.get('paysLogCreateTime')) {
            this.params.accountId = LocalStorage.get('paysLogDetailId')
            this.params.createTime = LocalStorage.get('paysLogCreateTime')
            this.reloadDeductTableData()
        }
    }


    initParams() {
        this.params = {limit: 10, start: 0}
        // this.reloadVlinAppData()
    }

    /**点击 顶部右侧"新建"按钮**/
    search() {
        if(this.params.accountId) {
            this.reloadDeductTableData()
        }else{
            appAlert.common.confirmWarning('请选择企业!')
        }
    }

    /**加载 应用账单 数据**/
    reloadDeductTableData() {
        this.isSpinner = 1
        this.loadingIndicator = true
        this.sysDeductTableService.reloadDeductTableData(this.params)
            .subscribe(page => {
                this.totalCount = page.data.page.totalCount
                this.isSpinner = 0
                if (page.data.result === '0') {
                    this.isSpinner = 0
                    // if (page.data.permission === 0) {
                    this.isPermission = 1
                    this.sysDeductTableData = [...page.data.list]
                    this.loadingIndicator = false
                    this.isPermission = 1
                    /*} else if (page.data.permission === -1) {
                      this.isPermission = 0
                    }*/
                }
            })
    }

    /**修改每页展示的数据条数pageSize**/
    getLimit(event) {
        Object.assign(this.params, {limit: event})
        this.reloadDeductTableData()
    }

    getDetail(row){
        LocalStorage.set('appDeductDetailLogAppId',row.appId)
        LocalStorage.set('appDeductDetailLogDeductMonth',row.deductMonth)
        this.router.navigate(['/index/paylogs/appDeductDetailLoge'])
    }

}
