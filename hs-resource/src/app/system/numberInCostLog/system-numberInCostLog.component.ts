import {Component, OnInit} from '@angular/core'
import {MatDialog} from '@angular/material'
import appAlert from '../../utils/alert'
import {SysNumberInCostLogService} from "./sys-numberInCostLog.service";
import {SysUserService} from "../user/sys-user.service";
import {LocalStorage} from "../../core/services/localstorage.service";
import {Router} from "@angular/router";
import {ConstantService} from "../../core/services/constant.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'app-system-numberInCostLog',
    templateUrl: 'system-numberInCostLog.component.html',
    styleUrls: ['system-numberInCostLog.component.less']
})

export class SystemNumberInCostLogComponent implements OnInit {
    sysNumberInCostLogData: any[] = []
    params: any = {limit: 10, start: 0}
    /**请求后端数据的参数**/
    totalCount = 0
    /*总数据条数，设置默认是0*/
    loadingIndicator = true
    isPermission = 1// 是否有权限
    isSpinner // 加载进度
    rolePermission
    user
    downiframe:any

    constructor(private router: Router,
                private sanitizer: DomSanitizer,
                private sysNumberInCostLogService: SysNumberInCostLogService,
                private sysUserService: SysUserService) {
        this.downiframe = this.sanitizer.bypassSecurityTrustResourceUrl('')
/*
        this.sysNumberInCostLogData = this.sysNumberInCostLogService.sysNumberInCostLogData
*/
    }

    ngOnInit() {
        if (LocalStorage.get('appDeductDetailLogAppId') && LocalStorage.get('appDeductDetailLogDeductMonth')) {
            this.params.appId = LocalStorage.get('appDeductDetailLogAppId')
            this.params.month = LocalStorage.get('appDeductDetailLogDeductMonth')
            this.reloadNumberInCostLogData()
        }
    }


    /**加载 应用账单 数据**/
    reloadNumberInCostLogData() {
        this.isSpinner = 1
        this.loadingIndicator = true
        this.sysNumberInCostLogService.reloadNumberInCostLogData(this.params)
            .subscribe(page => {
                this.totalCount = page.data.page.totalCount
                this.isSpinner = 0
                if (page.data.result === '0') {
                    this.isSpinner = 0
                    // if (page.data.permission === 0) {
                    this.isPermission = 1
                    this.sysNumberInCostLogData = [...page.data.list]
                    this.loadingIndicator = false
                    this.isPermission = 1
                    /*} else if (page.data.permission === -1) {
                      this.isPermission = 0
                    }*/
                }
            })
    }

    export(){
        this.downiframe = this.sanitizer.bypassSecurityTrustResourceUrl(ConstantService.HOST+'/paylogs/exportNumberInCostLogList?appId='+LocalStorage.get('appDeductDetailLogAppId')+'&deductMonth='+LocalStorage.get('appDeductDetailLogDeductMonth'))
    }

    /**修改每页展示的数据条数pageSize**/
    getLimit(event) {
        Object.assign(this.params, {limit: event})
        this.reloadNumberInCostLogData()
    }
}
