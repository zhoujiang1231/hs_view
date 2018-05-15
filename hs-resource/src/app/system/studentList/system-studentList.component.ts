import {Component, OnInit} from '@angular/core'
import {MatDialog} from '@angular/material'
import appAlert from '../../utils/alert'
import {SysStudentListService} from "./sys-studentList.service";
import {Router} from "@angular/router";
import {SysStudentListDialogComponent} from "./sys-student.dialog";

@Component({
    selector: 'app-system-studentList',
    templateUrl: 'system-studentList.component.html',
    styleUrls: ['system-studentList.component.less']
})

export class SystemStudentListComponent implements OnInit {
    studentListData: any[] = []
    departData: any[] = []
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
                private studentListService: SysStudentListService) {
    }

    ngOnInit() {
        this.reloadStudentListData()
        this.reloadDepartData()
    }


    /**加载 应用账单 数据**/
    reloadStudentListData() {
        this.isSpinner = 1
        this.loadingIndicator = true
        this.studentListService.reloadStudentListData(this.params)
            .subscribe(page => {
                this.isSpinner = 0
                if (page.data.result === '0') {
                    this.isSpinner = 0
                    // if (page.data.permission === 0) {
                    this.isPermission = 1
                    this.totalCount = page.data.page.total
                    this.studentListData = [...page.data.list]
                    this.formatData(this.studentListData)
                    this.loadingIndicator = false
                    this.isPermission = 1
                }
            })
    }

    /**获取所有部门**/
    reloadDepartData() {
        this.studentListService.reloadDepartData()
            .subscribe(page => {
                this.departData = [...page.data.list]
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
        this.reloadStudentListData()
    }

    deleteStudent(row){
        appAlert.common.remove('学生',() => {
            this.studentListService.deleteStudent(row.stuId)
                .subscribe(res =>{
                    if(res.data.result == 0){
                        this.reloadStudentListData()
                        this.reloadDepartData()
                    }
                })
        })
    }
    /**点击 顶部右侧"新建"按钮**/
    addStudent() {
        this.newDialog()
    }

    /**打开 新建dialog**/
    newDialog() {
        const config = SysStudentListDialogComponent.config
        let dialogRef = this._dialog.open(SysStudentListDialogComponent, config)
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result && result !== 'cancel') {
                this.reloadStudentListData()
                this.reloadDepartData()
            }
            config.data = {}
            dialogRef = null
        })
    }
}
