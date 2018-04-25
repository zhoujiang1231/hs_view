import {Component, OnInit} from '@angular/core'
import appAlert from '../../../../utils/alert'
import {LocalStorage} from "../../../../core/services/localstorage.service";
import {Router} from "@angular/router";
import {SysOtherSettingService} from "../sys-otherSetting.service";
import {SysOperationLogService} from "../../../operationLog/sys-operationLog.service";
import {SysCustomerManageService} from "../../../customerManage/sys-customerManage.service";

@Component({
    selector: 'app-system-messageSetting',
    templateUrl: 'system-messageSetting.component.html',
    styleUrls: ['system-messageSetting.component.less']
})

export class SystemMessageSettingComponent implements OnInit {
    messageSettingData: any[] = []
    addMessageParams: any = {}
    updateMessageDataParams: any[] = []
    updateMessageParams: any ={}
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
            this.addMessageParams.appId = LocalStorage.get('appId')
            this.reloadMessageData()
        }
    }

    /*获取短信费列表*/
    reloadMessageData() {
        this.sysotherSettingService.reloadmessageSettingData({appId: LocalStorage.get('appId')})
            .subscribe(page => {
                this.messageSettingData = [...page.data.list]
                this.updateMessageDataParams = JSON.parse(JSON.stringify(this.messageSettingData))
                this.updateMessageDataParams.forEach(item =>{
                    item.messageStartAmount = item.remark.split(',')[0]
                    item.messageEndAmount = item.remark.split(',')[1]
                    item.messageUnitCost = item.value
                })
            })
    }


    /**新增短信资费**/
    addMessageSetting() {
        this.addMessageParams.operationStr = LocalStorage.get('operator') + ',' + LocalStorage.get('operation_account') + ',' + LocalStorage.get('appName') + ',,开始条数:' + this.addMessageParams.messageStartAmount + ' 结束条数:' + this.addMessageParams.messageEndAmount +' 单价:' + this.addMessageParams.messageUnitCost + ',添加短信资费'
        if (!this.sysotherSettingService.checkNum(this.addMessageParams.messageStartAmount)) {
            appAlert.common.confirmWarning('开始条数不规范')
            return
        }
        if (this.addMessageParams.messageStartAmount == null) {
            appAlert.common.confirmWarning('请填写开始条数')
            return
        }
        if(this.addMessageParams.messageEndAmount==null || this.addMessageParams.messageEndAmount=="") {
            this.addMessageParams.messageEndAmount = "不限制";
        }
        else if(!this.sysotherSettingService.checkNum(this.addMessageParams.messageEndAmount)) {
            appAlert.common.confirmWarning('结束条数不规范')
            return
        }
        if(!this.sysotherSettingService.checkUnitCost(this.addMessageParams.messageUnitCost)) {
            appAlert.common.confirmWarning('单价格式错误，请严格按照12.3或者12的格式填写')
            return
        }
        this.sysotherSettingService.addmessageSetting(this.addMessageParams)
            .subscribe(page => {
                if (page.data.result == 0) {
                    this.reloadMessageData()
                }
            })
    }


    /*删除短信资费*/
    deleteMessage(row) {
        this.sysotherSettingService.deletemessageSetting(row.id)
            .subscribe(page => {
                if (page.data.result == 0) {
                    this.reloadMessageData()
                    var operationStr = LocalStorage.get('operator') + ',' + LocalStorage.get('operation_account') + ',' + LocalStorage.get('appName') + ',' + row.remark.split(',')[0] + '-' + row.remark.split(',')[1]+' 单价：'+row.value + ',,删除短信资费'
                    this.sysOperationLogService.deleteCostSettingLog({operationStr:operationStr})
                }
            })
    }

    /*修改短信费*/
    updateMessage(row){
        this.beforeUpdate = LocalStorage.get('operator')+','+LocalStorage.get('operation_account')+','+LocalStorage.get('appName')+',开始条数:'+row.remark.split(',')[0]+' 结束条数:'+row.remark.split(',')[1]+' 单价:'+row.value
        this.updateMessageDataParams.forEach(item=>{
            if(row.appId == item.appId && row.id == item.id){
                var operationStr = this.beforeUpdate+',开始条数:'+item.messageStartAmount+' 结束条数:'+item.messageEndAmount+' 单价:'+item.messageUnitCost+',修改短信资费'
                this.updateMessageParams.id = item.id
                this.updateMessageParams.messageStartAmount = item.messageStartAmount
                this.updateMessageParams.messageEndAmount = item.messageEndAmount
                this.updateMessageParams.messageUnitCost = item.messageUnitCost
                this.updateMessageParams.operationStr = operationStr
                this.sysotherSettingService.updatemessageSetting(this.updateMessageParams)
                    .subscribe(page =>{
                        if(page.data.result == 0){
                            this.reloadMessageData()
                        }
                    })
            }
        })
    }
    /*短信开始条数修改时数据绑定*/
    messageStartChange(event,row){
        this.updateMessageDataParams.forEach(item=>{
            if(row.id == item.id &&row.appId == item.appId){
                item.messageStartAmount = event.srcElement.value
            }
        })
    }
    /*短信结束条数修改时数据绑定*/
    messagEndChange(event,row){
        this.updateMessageDataParams.forEach(item=>{
            if(row.id == item.id &&row.appId == item.appId){
                item.messageEndAmount = event.srcElement.value
            }
        })
    }

    /*短信单价修改时数据绑定*/
    messageunitCostChange(event,row){
        this.updateMessageDataParams.forEach(item=>{
            if(row.id == item.id &&row.appId == item.appId){
                item.messageUnitCost = event.srcElement.value
            }
        })
    }

    /**应用资费各页面之间跳转**/
    appSettingTo(value) {
        this.router.navigate([value])
    }
}