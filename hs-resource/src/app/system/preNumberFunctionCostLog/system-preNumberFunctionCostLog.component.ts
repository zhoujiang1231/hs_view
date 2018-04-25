import {Component, OnInit} from '@angular/core'
import {MatDialog} from '@angular/material'
import appAlert from '../../utils/alert'
import {SysPreNumberFunctionCostLogService} from "./sys-preNumberFunctionCostLog.service";
import {SysUserService} from "../user/sys-user.service";
import {LocalStorage} from "../../core/services/localstorage.service";
import {Router} from "@angular/router";
import {ConstantService} from "../../core/services/constant.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'app-system-preNumberFunctionCostLog',
    templateUrl: 'system-preNumberFunctionCostLog.component.html',
    styleUrls: ['system-preNumberFunctionCostLog.component.less']
})

export class SystemPreNumberFunctionCostLogComponent implements OnInit {
    sysPreNumberFunctionCostLogData: any[] = []
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
                private sysNumberFunctionCostLogService: SysPreNumberFunctionCostLogService) {
        this.downiframe = this.sanitizer.bypassSecurityTrustResourceUrl('')
    }

    ngOnInit() {
        if (LocalStorage.get('preAppDeductDetailLogAppId') && LocalStorage.get('preAppDeductDetailLogDeductMonth')) {
            this.params.appId = LocalStorage.get('preAppDeductDetailLogAppId')
            this.params.deductMonth = LocalStorage.get('preAppDeductDetailLogDeductMonth')
            this.reloadPreNumberFunctionCostLogData()
        }
    }

    export(){
        this.downiframe = this.sanitizer.bypassSecurityTrustResourceUrl(ConstantService.HOST+'/preDeductLog/exportPreNumberFunctionCostLogList?appId='+LocalStorage.get('preAppDeductDetailLogAppId')+'&deductMonth='+LocalStorage.get('preAppDeductDetailLogDeductMonth'))
    }

    /**加载 应用账单 数据**/
    reloadPreNumberFunctionCostLogData() {
        this.isSpinner = 1
        this.loadingIndicator = true
        this.sysNumberFunctionCostLogService.reloadPreNumberFunctionCostLogData(this.params)
            .subscribe(page => {
                this.totalCount = page.data.page.totalCount
                this.isSpinner = 0
                if (page.data.result === '0') {
                    this.isSpinner = 0
                    this.isPermission = 1
                    this.sysPreNumberFunctionCostLogData = [...page.data.list]
                    this.loadingIndicator = false
                    this.isPermission = 1
                }
            })
    }


    /**修改每页展示的数据条数pageSize**/
    getLimit(event) {
        Object.assign(this.params, {limit: event})
        this.reloadPreNumberFunctionCostLogData()
    }
}
