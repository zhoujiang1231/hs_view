import {Component, OnInit} from '@angular/core'
import {MatDialog} from '@angular/material'
import appAlert from '../../utils/alert'
import {SysAppDeductDetailLogService} from "./sys-appDeductDetailLog.service";
import {SysUserService} from "../user/sys-user.service";
import {LocalStorage} from "../../core/services/localstorage.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-system-appDeductDetailLog',
    templateUrl: 'system-appDeductDetailLog.component.html',
    styleUrls: ['system-appDeductDetailLog.component.less']
})

export class SystemAppDeductDetailLogComponent implements OnInit {
    sysAppDeductDetailLogData: any[] = []
    params: any = {}
    /**请求后端数据的参数**/
    loadingIndicator = true
    isPermission = 1// 是否有权限
    isSpinner // 加载进度
    rolePermission
    user

    constructor(private router: Router,
                private sysAppDeductDetailLogService: SysAppDeductDetailLogService) {
    }

    ngOnInit() {
        if (LocalStorage.get('appDeductDetailLogAppId') && LocalStorage.get('appDeductDetailLogDeductMonth')) {
            this.params.appId = LocalStorage.get('appDeductDetailLogAppId')
            this.params.deductMonth = LocalStorage.get('appDeductDetailLogDeductMonth')
            this.reloadAppDeductDetailLogData()
        }
    }


    /**加载 应用账单 数据**/
    reloadAppDeductDetailLogData() {
        this.isSpinner = 1
        this.loadingIndicator = true
        this.sysAppDeductDetailLogService.reloadAppDeductDetailLogData(this.params)
            .subscribe(page => {
                this.isSpinner = 0
                if (page.data.result === '0') {
                    this.isSpinner = 0
                    // if (page.data.permission === 0) {
                    this.isPermission = 1
                    this.sysAppDeductDetailLogData = [...page.data.list]
                    let totalCost = 0
                    this.sysAppDeductDetailLogData.forEach(item =>{
                        totalCost += item.totalCost
                    })
                    this.sysAppDeductDetailLogData.push({costTypeDesc:'合计',condition:'',amount:'',unitCost:'',totalCost:totalCost})
                    this.formatData(this.sysAppDeductDetailLogData)
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
        this.reloadAppDeductDetailLogData()
    }

    getInDetail(row){
        this.router.navigate(['/index/paylogs/numberInCostLog'])
    }

    getNumberFunctionDetail(row){
        this.router.navigate(['/index/paylogs/numberFunctionCostLog'])
    }

}
