import {Component, OnInit} from '@angular/core'
import {MatDialog} from '@angular/material'
import appAlert from '../../utils/alert'
import {SysPreAppDeductLogService} from "./sys-preAppDeductLog.service";
import {SysUserService} from "../user/sys-user.service";
import {LocalStorage} from "../../core/services/localstorage.service";
import {Router} from "@angular/router";
import {DATE} from "ngx-bootstrap/chronos/units/constants";

@Component({
    selector: 'app-system-preAppDeductLog',
    templateUrl: 'system-preAppDeductLog.component.html',
    styleUrls: ['system-preAppDeductLog.component.less']
})

export class SystemPreAppDeductLogComponent implements OnInit {
    sysPreAppDeductLogData: any[] = []
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
                private sysPreAppDeductLogService: SysPreAppDeductLogService,
                private sysUserService: SysUserService) {
        /*this.sysPreAppDeductLogData = this.sysPreAppDeductLogService.sysPreAppDeductLogData*/
    }

    ngOnInit() {
        if(LocalStorage.get('prePaysLogDetailId')&&LocalStorage.get('prePaysLogCreateTime')) {
            this.params.accountId = LocalStorage.get('prePaysLogDetailId')
            this.params.deductMonth = LocalStorage.get('prePaysLogCreateTime')
            this.reloadPreAppDeductLogData()
        }
    }


    /**点击 顶部右侧"新建"按钮**/
    search() {
        if(this.params.accountId) {
            this.reloadPreAppDeductLogData()
        }else{
            appAlert.common.confirmWarning('请选择企业!')
        }
    }

    /**加载 应用账单 数据**/
    reloadPreAppDeductLogData() {
        this.isSpinner = 1
        this.loadingIndicator = true
        this.sysPreAppDeductLogService.reloadPreAppDeductLogData(this.params)
            .subscribe(page => {
                this.totalCount = page.data.page.totalCount
                this.isSpinner = 0
                if (page.data.result === '0') {
                    this.isSpinner = 0
                    // if (page.data.permission === 0) {
                    this.isPermission = 1
                    this.sysPreAppDeductLogData = [...page.data.list]
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
        this.reloadPreAppDeductLogData()
    }

    getDetail(row){
        LocalStorage.set('preAppDeductDetailLogAppId',row.appId)
        LocalStorage.set('preAppDeductDetailLogDeductMonth',row.deductMonth)
        this.router.navigate(['/index/preDeductLog/preAppDeductDetailLog'])
    }

}
