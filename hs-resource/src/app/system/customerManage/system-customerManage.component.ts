import {Component, OnInit} from '@angular/core'
import {SysCustomerManageService} from './sys-customerManage.service'
import {SysCustomerManageDialogComponent} from './sys-customerManage.dialog'
import {MatDialog} from '@angular/material'
import appAlert from "../../utils/alert";
import {LocalStorage} from "../../core/services/localstorage.service";
import {Router} from "@angular/router";
import {SysManagerManageService} from "../directManagerManage/sys-directManagerManage.service";
import {SysUserService} from "../user/sys-user.service";
import {ConstantService} from "../../core/services/constant.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'app-system-customerManage',
    templateUrl: 'system-customerManage.component.html',
    styleUrls: ['system-customerManage.component.less']
})

export class SystemCustomerManage implements OnInit {
    sysCustomerData: any[] = []
    params: any = {limit: 10, start: 0}
    /**请求后端数据的参数**/
    totalCount = 0
    /*总数据条数，设置默认是0*/
    loadingIndicator = false
    isPermission = 0// 是否有权限
    isSpinner // 加载进度
    customerStatusDec // 企业状态 1:正常 2:暂停 3:锁定 4:注销 5:上线 6:测试
    businessUpFlagDec //营业执照 0：未上传 1：已上传
    directDepartmentData: any[] = []
    directMangerData: any[] = []
    user
    downiframe:any

    constructor(private sysCustomerManageService: SysCustomerManageService,
                public _dialog: MatDialog,
                private router: Router,
                private sanitizer: DomSanitizer,
                private sysManagerManageService:SysManagerManageService,
                private sysUserService:SysUserService) {
        this.downiframe = this.sanitizer.bypassSecurityTrustResourceUrl('')
    }

    ngOnInit() {
        this.customerStatusDec = ['', '正常', '暂停', '锁定', '注销', '上线', '测试']
        this.businessUpFlagDec = ['未上传', '已上传']
        if(new Number(LocalStorage.get('type')) == 11) {
            this.sysManagerManageService.reloaddirectDepartmentIdAndName()
                .subscribe( page => {
                    if(page.data.result == 0){
                        this.directDepartmentData = [{id:null,fullName:'全部'},...page.data.list]
                    }
                })
            this.directMangerData .push({id:null,fullName:'全部'})
            this.isPermission = 1
        }
        if(new Number(LocalStorage.get('type')) == 5) {
            this.sysManagerManageService.reloaddirectDepartmentIdAndName()
                .subscribe( page => {
                    if(page.data.result == 0){
                        this.directDepartmentData = [...page.data.list]
                        this.params.parentParentId = this.directDepartmentData[0].id
                        this.user = LocalStorage.get('user')
                        this.directMangerData.push({id:this.user.id,fullName:this.user.fullName})
                        this.params.parentId = this.directMangerData[0].id
                        this.isPermission = 1
                    }
                })
        }
    }

    export(){
        let param = '?1=1'
        if(this.params.fullName){
            param += '&fullName='+this.params.fullName
        }
        if(this.params.balanceType){
            param += '&balanceType='+this.params.balanceType
        }
        if(this.params.status){
            param += '&status='+this.params.status
        }
        if(this.params.businessUpFlag){
            param += '&businessUpFlag='+this.params.businessUpFlag
        }
        if(this.params.parentParentId){
            param += '&parentParentId='+this.params.parentParentId
        }
        if(this.params.parentId){
            param += '&parentId='+this.params.parentId
        }
        if(param == '?1=1'){
            param = ''
        }
        this.downiframe = this.sanitizer.bypassSecurityTrustResourceUrl(ConstantService.HOST+'/customersToExcel'+param)
    }

    /**获取企业列表 数据**/
    reloadCustomerData() {
        this.sysCustomerManageService.reloadCustomerData(this.params)
            .subscribe(page => {
                this.totalCount = page.data.page.totalCount
                if (page.data.result === '0') {
                    this.isSpinner = 0
                    this.sysCustomerData = [...page.data.list]
                    this.formatData(this.sysCustomerData)
                    this.loadingIndicator = false
                    this.isPermission = 1
                }
            })
    }

    /*获取直销经理下拉框*/
    getdirectMangerData(){
        this.sysCustomerManageService.reloaddirectMangerData({directDepartmentId:this.params.parentParentId})
            .subscribe(page =>{
                if(page.data.result === '0'){
                    this.directMangerData = [{id:null,fullName:'全部'},...page.data.list]
                }
            })
    }

    /**点击 顶部右侧"新建"按钮**/
    onClickBtnWithAction(event) {
        if (event === 'add') {
            this.newDialog()
        }
    }

    /**打开 新建dialog**/
    newDialog() {
        const config = SysCustomerManageDialogComponent.config
        let dialogRef = this._dialog.open(SysCustomerManageDialogComponent, config)
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result && result !== 'cancel') {
                console.log('确定', result)
                this.reloadCustomerData()
            }
            config.data = {}
            dialogRef = null
        })
    }

    search() {
        this.sysCustomerManageService.reloadCustomerData(this.params)
            .subscribe(page => {
                this.totalCount = page.data.page.totalCount
                if (page.data.result === '0') {
                    this.isSpinner = 0
                    this.sysCustomerData = [...page.data.list]
                    this.formatData(this.sysCustomerData)
                    this.loadingIndicator = false
                }
            })
    }

    /**格式化数据：是否激活解析（1激活，0未激活）**/
    formatData(rows) {
        rows.forEach(item => {
            item.customerStatusDec = this.customerStatusDec[item.status]
            if (item.businessUpFlag == 0) {
                item.businessUpFlagDec = '未上传'
            } else {
                item.businessUpFlagDec = '已上传'
            }
        })
    }

    /**修改每页展示的数据条数pageSize**/
    getLimit(event) {
        Object.assign(this.params, {limit: event})
        this.reloadCustomerData()
    }

    /**点击操作按钮：删除**/
    operateButton(row) {
        if (row.appCount > 0) {
            appAlert.common.actionFailed('该企业删除失败')
        } else {
            appAlert.common.remove('数据', () => {
                this.sysUserService.deleteAccount(row.id)
                    .subscribe(page => {
                        if (page.data.result === '0') {
                            appAlert.common.actionSuccess('删除企业成功')
                            this.reloadCustomerData()
                        }
                    })
            })
        }
    }

    /**企业基本信息页面跳转**/
    customerInfo(row) {
        this.router.navigate(['/index/customerManage/enterpriseBasicMessage'])
        LocalStorage.set('accountId', row.id)
        LocalStorage.set('operation_account',row.shortName)
    }

}
