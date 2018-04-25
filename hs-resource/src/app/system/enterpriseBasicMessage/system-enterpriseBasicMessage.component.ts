import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core'
import {MatDialog} from '@angular/material'
import {SysEnterpriseBasicMessageService} from "./sys-enterpriseBasicMessage.service";
import {LocalStorage} from "../../core/services/localstorage.service";
import {SysCustomerManageService} from "../customerManage/sys-customerManage.service";
import {Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {SysBasicFileListDialogComponent} from "./sys-basicFileList.dialog";
@Component({
    selector: 'app-system-enterpriseBasicMessage',
    templateUrl: 'system-enterpriseBasicMessage.component.html',
    styleUrls: ['system-enterpriseBasicMessage.component.less']
})

export class SystemEnterpriseBasicMessageComponent implements OnInit {
    sysEnterpriseBasicMessageData: any = {}
    fileList: any[] = []
    params: any = {limit: 10, start: 0}
    downiframe:any
    myfile:FileList
    /**请求后端数据的参数**/
    loadingIndicator = true

    constructor(public _dialog: MatDialog,
                private router: Router,
                private sanitizer: DomSanitizer,
                private sysCustomerManageService:SysCustomerManageService,
                private sysEnterpriseBasicMessageService: SysEnterpriseBasicMessageService) {
    }

    ngOnInit() {
        if (LocalStorage.get('accountId')) {
            this.reloadCustomerMessageData()
            this.sysEnterpriseBasicMessageData.accountId = LocalStorage.get('accountId')
        }
    }

    reloadCustomerMessageData(){
        this.sysCustomerManageService.reloadCustomerMessageData({accountId:LocalStorage.get('accountId')})
            .subscribe(page =>{
                this.sysEnterpriseBasicMessageData = {...page.data.data}
            })
    }
    updateEnterpriseBasicMessage(){
        this.sysCustomerManageService.updateEnterpriseBasicMessage({accountId: LocalStorage.get('accountId'),accountFullName:this.sysEnterpriseBasicMessageData.accountFullName, fullName:this.sysEnterpriseBasicMessageData.fullName,legalPerson:this.sysEnterpriseBasicMessageData.legalPerson,businessNo:this.sysEnterpriseBasicMessageData.businessNo,registAddress:this.sysEnterpriseBasicMessageData.registAddress})
            .subscribe(page =>{
                if(page.data.result ==='0'){
                    this.reloadCustomerMessageData()
                }
            })
    }


    initParams() {
        this.params = {limit: 20, start: 0}
    }

    getFiles(){
        const config = SysBasicFileListDialogComponent.config
        let dialogRef = this._dialog.open(SysBasicFileListDialogComponent, config)
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result && result !== 'cancel') {
            }
            config.data = {}
            dialogRef = null
        })
    }

    /**企业各页面之间跳转**/
    customerManageTo(value) {
        this.router.navigate([value])
    }
}