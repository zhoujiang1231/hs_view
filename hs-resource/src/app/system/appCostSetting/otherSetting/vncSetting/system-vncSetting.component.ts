import {Component, OnInit} from '@angular/core'
import appAlert from '../../../../utils/alert'
import {LocalStorage} from "../../../../core/services/localstorage.service";
import {Router} from "@angular/router";
import {SysOtherSettingService} from "../sys-otherSetting.service";
import {SysOperationLogService} from "../../../operationLog/sys-operationLog.service";
import {SysCustomerManageService} from "../../../customerManage/sys-customerManage.service";

@Component({
    selector: 'app-system-vncSetting',
    templateUrl: 'system-vncSetting.component.html',
    styleUrls: ['system-vncSetting.component.less']
})

export class SystemVncSettingComponent implements OnInit {
    vncSettingData: any[] = []
    addVncParams: any = {}
    updateVncDataParams: any[] = []
    updateVncParams: any ={}
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
            this.addVncParams.appId = LocalStorage.get('appId')
            this.reloadVncData()
        }
    }


    /*获取vnc资费列表*/
    reloadVncData() {
        this.sysotherSettingService.reloadvncSettingData({appId: LocalStorage.get('appId')})
            .subscribe(page => {
                this.vncSettingData = [...page.data.list]
                this.updateVncDataParams = JSON.parse(JSON.stringify(this.vncSettingData))
                this.updateVncDataParams.forEach(item =>{
                    item.vncStartAmount = item.remark.split(',')[0]
                    item.vncEndAmount = item.remark.split(',')[1]
                    item.vncUnitCost = item.value
                })
            })
    }


    /**新增VNC资费**/
    addVncSetting() {
        this.addVncParams.operationStr = LocalStorage.get('operator') + ',' + LocalStorage.get('operation_account') + ',' + LocalStorage.get('appName') + ',,开始条数:' + this.addVncParams.vncStartAmount + ' 结束条数:' + this.addVncParams.vncEndAmount +' 单价:' + this.addVncParams.vncUnitCost + ',添加VNC资费'
        if (!this.sysotherSettingService.checkNum(this.addVncParams.vncStartAmount)) {
            appAlert.common.confirmWarning('开始条数不规范')
            return
        }
        if (this.addVncParams.vncStartAmount == null) {
            appAlert.common.confirmWarning('请填写开始条数')
            return
        }
        if(this.addVncParams.vncEndAmount==null || this.addVncParams.vncEndAmount=="") {
            this.addVncParams.vncEndAmount = "不限制";
        }
        else if(!this.sysotherSettingService.checkNum(this.addVncParams.vncEndAmount)) {
            appAlert.common.confirmWarning('结束条数不规范')
            return
        }
        if(!this.sysotherSettingService.checkUnitCost(this.addVncParams.vncUnitCost)) {
            appAlert.common.confirmWarning('单价格式错误，请严格按照12.3或者12的格式填写')
            return
        }
        this.sysotherSettingService.addvncSetting(this.addVncParams)
            .subscribe(page => {
                if (page.data.result == 0) {
                    this.reloadVncData()
                }
            })
    }
    /*删除VNC资费*/
    deleteVnc(row) {
        this.sysotherSettingService.deletevncSetting(row.id)
            .subscribe(page => {
                if (page.data.result == 0) {
                    this.reloadVncData()
                    var operationStr = LocalStorage.get('operator') + ',' + LocalStorage.get('operation_account') + ',' + LocalStorage.get('appName') + ',' + row.remark.split(',')[0] + '-' + row.remark.split(',')[1]+' 单价：'+row.value + ',,删除VNC资费'
                    this.sysOperationLogService.deleteCostSettingLog({operationStr:operationStr})
                }
            })
    }


    /*修改vnc费*/
    updateVnc(row){
        this.beforeUpdate = LocalStorage.get('operator')+','+LocalStorage.get('operation_account')+','+LocalStorage.get('appName')+',开始分钟数:'+row.remark.split(',')[0]+' 结束分钟数:'+row.remark.split(',')[1]+' 单价:'+row.value
        this.updateVncDataParams.forEach(item=>{
            if(row.appId == item.appId && row.id == item.id){
                var operationStr = this.beforeUpdate+',开始分钟数:'+item.vncStartAmount+' 结束分钟数:'+item.vncEndAmount+' 单价:'+item.vncUnitCost+',修改VNC资费'
                this.updateVncParams.id = item.id
                this.updateVncParams.vncStartAmount = item.vncStartAmount
                this.updateVncParams.vncEndAmount = item.vncEndAmount
                this.updateVncParams.vncUnitCost = item.vncUnitCost
                this.updateVncParams.operationStr = operationStr
                this.sysotherSettingService.updatevncSetting(this.updateVncParams)
                    .subscribe(page =>{
                        if(page.data.result == 0){
                            this.reloadVncData()
                        }
                    })
            }
        })
    }
    /*vnc开始条数修改时数据绑定*/
    vncStartChange(event,row){
        this.updateVncDataParams.forEach(item=>{
            if(row.id == item.id &&row.appId == item.appId){
                item.vncStartAmount = event.srcElement.value
            }
        })
    }
    /*vnc结束条数修改时数据绑定*/
    vncEndChange(event,row){
        this.updateVncDataParams.forEach(item=>{
            if(row.id == item.id &&row.appId == item.appId){
                item.vncEndAmount = event.srcElement.value
            }
        })
    }

    /*vnc单价修改时数据绑定*/
    vncunitCostChange(event,row){
        this.updateVncDataParams.forEach(item=>{
            if(row.id == item.id &&row.appId == item.appId){
                item.vncUnitCost = event.srcElement.value
            }
        })
    }

    /**应用资费各页面之间跳转**/
    appSettingTo(value) {
        this.router.navigate([value])
    }
}