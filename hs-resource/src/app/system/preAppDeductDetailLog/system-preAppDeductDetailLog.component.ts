import {Component, OnInit} from '@angular/core'
import {MatDialog} from '@angular/material'
import appAlert from '../../utils/alert'
import {SysPreAppDeductDetailLogService} from "./sys-preAppDeductDetailLog.service";
import {SysUserService} from "../user/sys-user.service";
import {LocalStorage} from "../../core/services/localstorage.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-system-preAppDeductDetailLog',
    templateUrl: 'system-preAppDeductDetailLog.component.html',
    styleUrls: ['system-preAppDeductDetailLog.component.less']
})

export class SystemPreAppDeductDetailLogComponent implements OnInit {
    sysPreAppDeductDetailLogData: any[] = []
    params: any = {}
    /**请求后端数据的参数**/
    loadingIndicator = true
    isPermission = 1// 是否有权限
    isSpinner // 加载进度
    rolePermission
    user

    constructor(private router: Router,
                private sysPreAppDeductDetailLogService: SysPreAppDeductDetailLogService,
                private sysUserService: SysUserService) {
/*
        this.sysPreAppDeductDetailLogData = this.sysPreAppDeductDetailLogService.sysPreAppDeductDetailLogData
*/
    }

    ngOnInit() {
        if (LocalStorage.get('preAppDeductDetailLogAppId') && LocalStorage.get('preAppDeductDetailLogDeductMonth')) {
            this.params.appId = LocalStorage.get('preAppDeductDetailLogAppId')
            this.params.deductMonth = LocalStorage.get('preAppDeductDetailLogDeductMonth')
            this.reloadPreAppDeductDetailLogData()
        }
    }

    /**点击 顶部右侧"新建"按钮**/
    search() {
        if(this.params.accountId) {
            this.reloadPreAppDeductDetailLogData()
        }else{
            appAlert.common.confirmWarning('请选择企业!')
        }
    }

    /**加载 应用账单 数据**/
    reloadPreAppDeductDetailLogData() {
        this.isSpinner = 1
        this.loadingIndicator = true
        this.sysPreAppDeductDetailLogService.reloadPreAppDeductDetailLogData(this.params)
            .subscribe(page => {
                this.isSpinner = 0
                if (page.data.result === '0') {
                    this.isSpinner = 0
                    // if (page.data.permission === 0) {
                    this.isPermission = 1
                    this.sysPreAppDeductDetailLogData = [...page.data.list]
                    let totalCost = 0
                    this.sysPreAppDeductDetailLogData.forEach(item =>{
                        totalCost += item.totalCost
                    })
                    this.sysPreAppDeductDetailLogData.push({costTypeDesc:'合计',condition:'',amount:'',unitCost:'',totalCost:totalCost})
                    this.formatData(this.sysPreAppDeductDetailLogData)
                    this.loadingIndicator = false
                    this.isPermission = 1
                    /*} else if (page.data.permission === -1) {
                      this.isPermission = 0
                    }*/
                }
            })
    }

    formatData(row){
        row.forEach(item=>{
            if(item.costType == 'in'){
                item.costTypeDesc = '呼入资费'
            }
            if(item.costType == 'in_bridge'){
                item.costTypeDesc = '呼入转接资费'
            }
            if(item.costType == 'out'){
                item.costTypeDesc = '外呼资费'
            }
            if(item.costType == 'out_bridge'){
                item.costTypeDesc = '外呼转接资费'
            }
            if(item.costType == 'message_fee'){
                item.costTypeDesc = '短信费'
            }
            if(item.costType == 'USSD'){
                item.costTypeDesc = 'USSD费用'
            }
            if(item.costType == 'VOS'){
                item.costTypeDesc = 'VOS费用'
            }
            if(item.costType == 'number_function'){
                item.costTypeDesc = '号码功能费'
            }
            if(item.costType == 'function'){
                item.costTypeDesc = '功能费'
            }
            if(item.costType == 'VNC'){
                item.costTypeDesc = 'VNC费用'
            }
        })
    }

    /**修改每页展示的数据条数pageSize**/
    getLimit(event) {
        Object.assign(this.params, {limit: event})
        this.reloadPreAppDeductDetailLogData()
    }

    getInDetail(row){
        this.router.navigate(['/index/preDeductLog/preNumberInCostLog'])
    }

    getNumberFunctionDetail(row){
        this.router.navigate(['/index/preDeductLog/preNumberFunctionCostLog'])
    }

}
