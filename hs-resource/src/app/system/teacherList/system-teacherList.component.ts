import {Component, OnInit} from '@angular/core'
import {MatDialog} from '@angular/material'
import appAlert from '../../utils/alert'
import {SysTeacherListService} from "./sys-teacherList.service";
import {LocalStorage} from "../../core/services/localstorage.service";
import {Router} from "@angular/router";
import {SysTeacherListDialogComponent} from "./sys-teacher.dialog";

@Component({
    selector: 'app-system-teacherList',
    templateUrl: 'system-teacherList.component.html',
    styleUrls: ['system-teacherList.component.less']
})

export class SystemTeacherListComponent implements OnInit {
    TeacherListData: any[] = []
    params: any = {start:1,limit:20}
    totalCount
    /**请求后端数据的参数**/
    loadingIndicator = true
    isPermission = 1// 是否有权限
    isSpinner // 加载进度
    rolePermission
    user

    constructor(private router: Router,
                public _dialog: MatDialog,
                private TeacherListService: SysTeacherListService) {
    }

    ngOnInit() {
        this.reloadTeacherListData()
    }


    /**加载教师 数据**/
    reloadTeacherListData() {
        this.isSpinner = 1
        this.loadingIndicator = true
        this.TeacherListService.reloadTeacherListData(this.params)
            .subscribe(page => {
                this.isSpinner = 0
                if (page.data.result === '0') {
                    this.isSpinner = 0
                    // if (page.data.permission === 0) {
                    this.isPermission = 1
                    this.totalCount = page.data.page.total
                    this.TeacherListData = [...page.data.list]
                    this.formatData(this.TeacherListData)
                    this.loadingIndicator = false
                    this.isPermission = 1
                }
            })
    }

    formatData(row){
        row.forEach(item=>{
            if(item.stuSex == 0){
                item.stuSexDec = '男'
            }
            if(item.stuSex == 1){
                item.stuSexDec = '女'
            }
        })
    }

    /**修改每页展示的数据条数pageSize**/
    getLimit(event) {
        Object.assign(this.params, {limit: event})
        this.reloadTeacherListData()
    }

    deleteTeacher(row){
        appAlert.common.remove('教师',() => {
            this.TeacherListService.deleteTeacher(row.tId)
                .subscribe(res =>{
                    if(res.data.result == 0){
                        this.reloadTeacherListData()
                    }
                })
        })
    }
    /**点击 顶部右侧"新建"按钮**/
    addTeacher() {
        this.newDialog()
    }

    /**打开 新建dialog**/
    newDialog() {
        const config = SysTeacherListDialogComponent.config
        let dialogRef = this._dialog.open(SysTeacherListDialogComponent, config)
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result && result !== 'cancel') {
                console.log('确定', result)
                this.reloadTeacherListData()
            }
            config.data = {}
            dialogRef = null
        })
    }
}
