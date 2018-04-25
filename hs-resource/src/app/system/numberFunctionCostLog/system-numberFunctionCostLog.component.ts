import {Component, OnInit} from '@angular/core'
import {SysNumberFunctionCostLogService} from "./sys-numberFunctionCostLog.service";
import {SysUserService} from "../user/sys-user.service";
import {LocalStorage} from "../../core/services/localstorage.service";
import {Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {ConstantService} from "../../core/services/constant.service";

@Component({
    selector: 'app-system-numberFunctionCostLog',
    templateUrl: 'system-numberFunctionCostLog.component.html',
    styleUrls: ['system-numberFunctionCostLog.component.less']
})

export class SystemNumberFunctionCostLogComponent implements OnInit {
    sysNumberFunctionCostLogData: any[] = []
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
                private sysNumberFunctionCostLogService: SysNumberFunctionCostLogService,
                private sysUserService: SysUserService) {
        this.downiframe = this.sanitizer.bypassSecurityTrustResourceUrl('')
/*
        this.sysNumberFunctionCostLogData = this.sysNumberFunctionCostLogService.sysNumberFunctionCostLogData
*/
    }

    ngOnInit() {
        if (LocalStorage.get('appDeductDetailLogAppId') && LocalStorage.get('appDeductDetailLogDeductMonth')) {
            this.params.appId = LocalStorage.get('appDeductDetailLogAppId')
            this.params.month = LocalStorage.get('appDeductDetailLogDeductMonth')
            this.reloadNumberFunctionCostLogData()
        }
    }
    /**加载 应用账单 数据**/
    reloadNumberFunctionCostLogData() {
        this.isSpinner = 1
        this.loadingIndicator = true
        this.sysNumberFunctionCostLogService.reloadNumberFunctionCostLogData(this.params)
            .subscribe(page => {
                this.totalCount = page.data.page.totalCount
                this.isSpinner = 0
                if (page.data.result === '0') {
                    this.isSpinner = 0
                    // if (page.data.permission === 0) {
                    this.isPermission = 1
                    this.sysNumberFunctionCostLogData = [...page.data.list]
                    this.loadingIndicator = false
                    this.isPermission = 1
                    /*} else if (page.data.permission === -1) {
                      this.isPermission = 0
                    }*/
                }
            })
    }

    export(){
        this.downiframe = this.sanitizer.bypassSecurityTrustResourceUrl(ConstantService.HOST+'/paylogs/exportNumberFunctionCostLogList?appId='+LocalStorage.get('appDeductDetailLogAppId')+'&deductMonth='+LocalStorage.get('appDeductDetailLogDeductMonth'))
    }

    /**修改每页展示的数据条数pageSize**/
    getLimit(event) {
        Object.assign(this.params, {limit: event})
        this.reloadNumberFunctionCostLogData()
    }
}
