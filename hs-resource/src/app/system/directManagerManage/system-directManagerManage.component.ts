import {Component, OnInit} from '@angular/core'
import {MatDialog} from '@angular/material'
import {NewManagerDialogComponent} from './new-directManagerManage.dialog'
import appAlert from '../../utils/alert'
import {SysManagerManageService} from './sys-directManagerManage.service'
import {LocalStorage} from "../../core/services/localstorage.service";

@Component({
    selector: 'app-system-product',
    templateUrl: 'system-directManagerManage.component.html',
    styleUrls: ['system-directManagerManage.component.less']
})

export class DirectManagerComponent implements OnInit {
    directManagerData: any[] = []
    params: any = {limit: 10, start: 0}
    /**请求后端数据的参数**/
    totalCount = 0
    /*总数据条数，设置默认是0*/
    loadingIndicator = true
    isPermission = 1// 是否有权限
    isSpinner // 加载进度
    departMentArr: any[] = []
    rolePermission
    user

    constructor(public _dialog: MatDialog,
                private sysManagerManageService: SysManagerManageService) {
        this.rolePermission = LocalStorage.get('type')
    }

    ngOnInit() {
        if(this.rolePermission == 11) {
            this.sysManagerManageService.reloaddirectDepartmentIdAndName()
                .subscribe(page => {
                    if (page.data.result == 0) {
                        this.departMentArr = [{id: null, fullName: '全部'}, ...page.data.list]
                    }
                })
        }
        if( this.rolePermission== 4){
            this.sysManagerManageService.reloaddirectDepartmentIdAndName()
                .subscribe(page => {
                    if (page.data.result == 0) {
                        this.departMentArr = [...page.data.list]
                    }
                })
            this.user = LocalStorage.get('user')
            this.params.parentId = this.user.id
        }
    }


    /**点击 顶部右侧"新建"按钮**/
    search() {
        this.reloadDirectManagerManage()
    }

    /**加载 直销经理 数据**/
    reloadDirectManagerManage() {
        this.isSpinner = 1
        this.loadingIndicator = true
        this.sysManagerManageService.reloadAllDirectManager(this.params)
            .subscribe(page => {
                this.totalCount = page.data.page.totalCount
                this.isSpinner = 0
                if (page.data.result === '0') {
                    this.isSpinner = 0
                    this.isPermission = 1
                    this.directManagerData = [...page.data.list]
                    this.loadingIndicator = false
                    this.isPermission = 1
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
        const config = NewManagerDialogComponent.config
        let dialogRef = this._dialog.open(NewManagerDialogComponent, config)
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result && result !== 'cancel') {
                console.log('确定', result)
                this.reloadDirectManagerManage()
            }
            config.data = {}
            dialogRef = null
        })
    }

    /**修改每页展示的数据条数pageSize**/
    getLimit(event) {
        Object.assign(this.params, {limit: event})
        this.reloadDirectManagerManage()
    }

    /**点击操作按钮：编辑产品、编辑配置、删除**/
    operateButton(value, row) {
        console.log(row)
        if (value === 0) {// 编辑
            const temRow = Object.assign({}, row)
            const config = NewManagerDialogComponent.config
            config.data = temRow
            let dialogRef = this._dialog.open(NewManagerDialogComponent, config)
            dialogRef.afterClosed().subscribe((result: any) => {
                console.log(result)
                if (result && result !== 'cancel') {
                    this.reloadDirectManagerManage()
                }
                config.data = {}
                dialogRef = null
            })
        } else if (value === 1) {// 删除
            if (row.customerNum > 0) {
                appAlert.common.actionFailed('该直销经理删除失败')
            } else {
                appAlert.common.remove('直销经理', () => {
                    this.sysManagerManageService.deleteDirectManager(row.id)
                        .subscribe(page => {
                            if (page.data.result === '0') {
                                appAlert.common.actionSuccess('删除直销经理成功')
                                this.reloadDirectManagerManage()
                            }
                        })
                })
            }
        }
    }
}
