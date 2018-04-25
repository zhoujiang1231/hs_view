import {Component, OnInit} from '@angular/core'
import appAlert from '../../../../utils/alert'
import {LocalStorage} from "../../../../core/services/localstorage.service";
import {Router} from "@angular/router";
import {SysOtherSettingService} from "../sys-otherSetting.service";
import {SysOperationLogService} from "../../../operationLog/sys-operationLog.service";
import {SysCustomerManageService} from "../../../customerManage/sys-customerManage.service";

@Component({
    selector: 'app-system-ussdSetting',
    templateUrl: 'system-ussdSetting.component.html',
    styleUrls: ['system-ussdSetting.component.less']
})

export class SystemUssdSettingComponent implements OnInit {
    ussdSettingData: any[] = []
    addUssdParams: any = {}
    updateUssdDataParams: any[] = []
    updateUssdParams: any ={}
    beforeUpdate
    /**请求后端数据的参数**/
    loadingIndicator = true
    appIdAndName: any = {}

    constructor(private router: Router,
                private sysotherSettingService: SysOtherSettingService,
                private sysOperationLogService: SysOperationLogService) {
    }

    ngOnInit() {
        if (LocalStorage.get('appId')) {
            this.appIdAndName.appId = LocalStorage.get('appId')
            this.appIdAndName.appName = LocalStorage.get('appName')
            this.addUssdParams.appId = LocalStorage.get('appId')
            this.reloadUssdData()
        }
    }


    /*获取ussd资费列表*/
    reloadUssdData() {
        this.sysotherSettingService.reloadussdSettingData({appId: LocalStorage.get('appId')})
            .subscribe(page => {
                this.ussdSettingData = [...page.data.list]
                this.updateUssdDataParams = JSON.parse(JSON.stringify(this.ussdSettingData))
                this.updateUssdDataParams.forEach(item =>{
                    item.ussdStartAmount = item.remark.split(',')[0]
                    item.ussdEndAmount = item.remark.split(',')[1]
                    item.ussdUnitCost = item.value
                })
            })
    }


    /**新增ussd资费**/
    addUssdSetting() {
        this.addUssdParams.operationStr = LocalStorage.get('operator') + ',' + LocalStorage.get('operation_account') + ',' + LocalStorage.get('appName') + ',,开始条数:' + this.addUssdParams.ussdStartAmount + ' 结束条数:' + this.addUssdParams.ussdEndAmount +' 单价:' + this.addUssdParams.ussdUnitCost + ',添加USSD资费'
        if (!this.sysotherSettingService.checkNum(this.addUssdParams.ussdStartAmount)) {
            appAlert.common.confirmWarning('开始条数不规范')
            return
        }
        if (this.addUssdParams.ussdStartAmount == null) {
            appAlert.common.confirmWarning('请填写开始条数')
            return
        }
        if(this.addUssdParams.ussdEndAmount==null || this.addUssdParams.ussdEndAmount=="") {
            this.addUssdParams.ussdEndAmount = "不限制";
        }
        else if(!this.sysotherSettingService.checkNum(this.addUssdParams.ussdEndAmount)) {
            appAlert.common.confirmWarning('结束条数不规范')
            return
        }
        if(!this.sysotherSettingService.checkUnitCost(this.addUssdParams.ussdUnitCost)) {
            appAlert.common.confirmWarning('单价格式错误，请严格按照12.3或者12的格式填写')
            return
        }
        this.sysotherSettingService.addussdSetting(this.addUssdParams)
            .subscribe(page => {
                if (page.data.result == 0) {
                    this.reloadUssdData()
                }
            })
    }

    /*删除USSD资费*/
    deleteUssd(row) {
        this.sysotherSettingService.deleteussdSetting(row.id)
            .subscribe(page => {
                if (page.data.result == 0) {
                    this.reloadUssdData()
                    var operationStr = LocalStorage.get('operator') + ',' + LocalStorage.get('operation_account') + ',' + LocalStorage.get('appName') + ',' + row.remark.split(',')[0] + '-' + row.remark.split(',')[1]+' 单价：'+row.value + ',,删除USSD资费'
                    this.sysOperationLogService.deleteCostSettingLog({operationStr:operationStr})
                }
            })
    }
    /*修改ussd费*/
    updateUssd(row){
        this.beforeUpdate = LocalStorage.get('operator')+','+LocalStorage.get('operation_account')+','+LocalStorage.get('appName')+',开始条数:'+row.remark.split(',')[0]+' 结束条数:'+row.remark.split(',')[1]+' 单价:'+row.value
        this.updateUssdDataParams.forEach(item=>{
            if(row.appId == item.appId && row.id == item.id){
                var operationStr = this.beforeUpdate+',开始条数:'+item.ussdStartAmount+' 结束条数:'+item.ussdEndAmount+' 单价:'+item.ussdUnitCost+',修改USSD资费'
                this.updateUssdParams.id = item.id
                this.updateUssdParams.ussdStartAmount = item.ussdStartAmount
                this.updateUssdParams.ussdEndAmount = item.ussdEndAmount
                this.updateUssdParams.ussdUnitCost = item.ussdUnitCost
                this.updateUssdParams.operationStr = operationStr
                this.sysotherSettingService.updateussdSetting(this.updateUssdParams)
                    .subscribe(page =>{
                        if(page.data.result == 0){
                            this.reloadUssdData()
                        }
                    })
            }
        })
    }
    /*ussd开始分钟数修改时数据绑定*/
    ussdStartChange(event,row){
        this.updateUssdDataParams.forEach(item=>{
            if(row.id == item.id &&row.appId == item.appId){
                item.ussdStartAmount = event.srcElement.value
            }
        })
    }
    /*ussd结束分钟数数修改时数据绑定*/
    ussdEndChange(event,row){
        this.updateUssdDataParams.forEach(item=>{
            if(row.id == item.id &&row.appId == item.appId){
                item.ussdEndAmount = event.srcElement.value
            }
        })
    }

    /*ussd单价修改时数据绑定*/
    ussdunitCostChange(event,row){
        this.updateUssdDataParams.forEach(item=>{
            if(row.id == item.id &&row.appId == item.appId){
                item.ussdUnitCost = event.srcElement.value
            }
        })
    }

    /**应用资费各页面之间跳转**/
    appSettingTo(value) {
        this.router.navigate([value])
    }
}