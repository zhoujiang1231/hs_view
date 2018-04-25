import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core'
import {MatDialog} from '@angular/material'
import appAlert from '../../utils/alert'
import {SysEnterpriseAppManagerService} from "./sys-enterpriseAppManager.service";
import {LocalStorage} from "../../core/services/localstorage.service";
import {SysCustomerManageService} from "../customerManage/sys-customerManage.service";
import Russian from 'flatpickr/dist/l10n/zh.js'
import {Router} from "@angular/router";
import * as moment from "moment";
import {FlatpickrOptions} from "ng2-flatpickr";
import {SysUserService} from "../user/sys-user.service";
import {SysDitectDepartmentManageService} from "../directDepartmentManage/sys-directDepartmentManage.service";
import {SysManagerManageService} from "../directManagerManage/sys-directManagerManage.service";
import {NewDirectDepartmentManageDialogComponent} from "../directDepartmentManage/new-directDepartmentManage.dialog";
import {NewVlinkAppDialogComponent} from "./new-VlinkApp.dialog";
import {SysFileListDialogComponent} from "./sys-fileList.dialog";

@Component({
    selector: 'app-system-product',
    templateUrl: 'system-enterpriseAppManager.component.html',
    styleUrls: ['system-enterpriseAppManager.component.less']
})

export class SystemEnterpriseAppManagerComponent implements OnInit {
    sysEnterpriseAppManagerData: any[] = []
    addAppParams: any = {}
    params: any = {limit: 10, start: 0}
    updateEnterpriseAppManagerParams: any[] = []
    updateVlinkAppParams: any ={}
    /**请求后端数据的参数**/
    loadingIndicator = true
    constructor(public _dialog: MatDialog,
                private router: Router,
                private sysCustomerManageService:SysCustomerManageService,
                private sysManagerManageService:SysManagerManageService,
                private sysEnterpriseAppManagerService: SysEnterpriseAppManagerService) {
    }

    ngOnInit() {
        if (LocalStorage.get('accountId')) {
            this.reloadEnterpriseAppManagerData()
            this.addAppParams.accountId = LocalStorage.get('accountId')
        }
    }

    reloadEnterpriseAppManagerData(){
        this.sysEnterpriseAppManagerService.reloadEnterpriseAppManagerData({accountId:LocalStorage.get('accountId')})
            .subscribe(page =>{
                this.sysEnterpriseAppManagerData = [...page.data.list]
                this.updateEnterpriseAppManagerParams = this.sysEnterpriseAppManagerData
                this.formatData(this.sysEnterpriseAppManagerData)
            })
    }

    /*格式化数据*/
    formatData(row){
        row.forEach(item =>{
            if(item.safetyLevel== null){
                item.safetyLevel = '0'
            }
        })
    }

    /**企业各页面之间跳转**/
    customerManageTo(value) {
        this.router.navigate([value])
    }
    /*新建应用*/
    createApp(){
        if(this.addAppParams.type) {
            if(this.addAppParams.type != 'VNC'){
                this.addAppParams.appKey = null
                this.addAppParams.secretKey = null
                this.addAppParams.serviceType = null
            }
            if(this.addAppParams.type != 'SMAP'){
                this.addAppParams.tel = null
            }
            this.sysEnterpriseAppManagerService.createVlinkApp(this.addAppParams)
                .subscribe(page => {
                    if (page.data.result == 0) {
                        this.reloadEnterpriseAppManagerData()
                        this.addAppParams.accountId =null
                        this.addAppParams.type =null
                        this.addAppParams.appName =null
                        this.addAppParams.appKey =null
                        this.addAppParams.secretKey =null
                        this.addAppParams.serviceType =null
                        this.addAppParams.tel = null
                    }
                })
        }
        else{
            appAlert.common.confirmWarning('请选择应用类型并且输入应用名称！')
        }
    }

    /**打开 新建dialog**/
    newDialog() {
        const config = NewVlinkAppDialogComponent.config
        let dialogRef = this._dialog.open(NewVlinkAppDialogComponent, config)
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result && result !== 'cancel') {
                this.reloadEnterpriseAppManagerData()
            }
            config.data = {}
            dialogRef = null
        })
    }

    /*添加应用*/
    addApp(){
        this.newDialog()
    }

    /*0查看 1修改2配置3删除*/
    operateButton(value, row){
        if(value == 0){
            this.getAllFileList(row.appId)
        }
        if(value == 1){
            this.updateVlinkApp(row)
        }
        if(value == 2){
            this.getAllAppSetting(row)
        }
        if(value == 3){
            this.deleteVlinkApp(row.appId)
        }
    }
    getAllFileList(value){
        LocalStorage.set('appId',value)
        const config = SysFileListDialogComponent.config
        let dialogRef = this._dialog.open(SysFileListDialogComponent, config)
        dialogRef.afterClosed().subscribe((result: any) => {
            config.data = {}
            dialogRef = null
        })
    }
    /*更改应用信息*/
    updateVlinkApp(row){
        this.updateEnterpriseAppManagerParams.forEach(item=>{
            if(row.appId == item.appId){
                this.updateVlinkAppParams.accountId = item.vlinkAccountId
                this.updateVlinkAppParams.appId = item.appId
                this.updateVlinkAppParams.id = item.id
                this.updateVlinkAppParams.appName = item.appName
                this.updateVlinkAppParams.type = item.type
                this.updateVlinkAppParams.status = new Number(item.status)
                this.updateVlinkAppParams.safetyLevel = new Number(item.safetyLevel)
                this.sysEnterpriseAppManagerService.updateVlinkApp(this.updateVlinkAppParams)
                    .subscribe(page =>{
                        if(page.data.result == 0){
                            this.reloadEnterpriseAppManagerData()
                }
                })
            }
        })
    }
    /*应用配置页面跳转*/
    getAllAppSetting(row){
        LocalStorage.set('appId',row.appId)
        LocalStorage.set('appName',row.appName)
        this.router.navigate(['/index/appCostSetting/inSetting'])
    }
    deleteVlinkApp(value){
        this.sysEnterpriseAppManagerService.deleteVlinkApp(LocalStorage.get('accountId'),value)
            .subscribe(page => {
                if(page.data.result == 0){
                    this.reloadEnterpriseAppManagerData()
                }
            })
    }
    /*应用名称改变时绑定数据*/
    appNameChange(event,row){
        this.updateEnterpriseAppManagerParams.forEach(item=>{
            if(row.appId == item.appId){
                item.appName = event.srcElement.value
            }
        })
    }
    /*应用类型改变时绑定数据*/
    typeChange(event,row){
        this.updateEnterpriseAppManagerParams.forEach(item=>{
            if(row.appId == item.appId){
                item.type = event.value
            }
        })
    }
    /*应用状态改变时绑定数据*/
    statusChange(event,row){
        this.updateEnterpriseAppManagerParams.forEach(item=>{
            if(row.appId == item.appId){
                item.status = event.value
            }
        })
    }
    /*应用安全等级改变时绑定数据*/
    safetyLevelChange(event,row){
        this.updateEnterpriseAppManagerParams.forEach(item=>{
            if(row.appId == item.appId){
                item.safetyLevel = event.value
            }
        })
    }
}