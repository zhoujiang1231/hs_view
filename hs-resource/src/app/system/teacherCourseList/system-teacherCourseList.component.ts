import {Component, OnInit} from '@angular/core'
import {MatDialog} from '@angular/material'
import appAlert from '../../utils/alert'
import {SysTeacherCourseListService} from "./sys-teacherCourseList.service";
import {LocalStorage} from "../../core/services/localstorage.service";
import {Router} from "@angular/router";
import {SysTeacherCourseDialogComponent} from "./sys-teacherCourse.dialog";

@Component({
    selector: 'app-system-teacherCourseList',
    templateUrl: 'system-teacherCourseList.component.html',
    styleUrls: ['system-teacherCourseList.component.less']
})

export class SystemTeacherCourseListComponent implements OnInit {
    courseListData: any[] = []
    params: any = {start:1,limit:20}
    totalCount
    /**请求后端数据的参数**/
    loadingIndicator = true
    isPermission = 0// 是否有权限
    isSpinner // 加载进度
    rolePermission
    user
    userType
    isStudent = 0

    constructor(private router: Router,
                public _dialog: MatDialog,
                private courseListService: SysTeacherCourseListService) {
    }

    ngOnInit() {
        if(LocalStorage.get('userType')){
            this.userType = LocalStorage.get('userType')
        }
        if(this.userType!='2'){
            this.isPermission =1
        }
        this.reloadTeacherCourseListData()
        if(this.userType == '1'){
            this.user = LocalStorage.get('user')
            this.isStudent = 1
        }
    }


    /**加载 课程列表 数据**/
    reloadTeacherCourseListData() {
        this.isSpinner = 1
        this.loadingIndicator = true
        this.courseListService.reloadTeacherCourseListData(this.params)
            .subscribe(page => {
                this.isSpinner = 0
                if (page.data.result == '0') {
                    this.isSpinner = 0
                    // if (page.data.permission === 0) {
                    this.isPermission = 1
                    this.totalCount = page.data.page.total
                    this.courseListData = [...page.data.list]
                    this.formatData(this.courseListData)
                    this.loadingIndicator = false
                    this.isPermission = 1
                }
            })
    }

    formatData(row){
        row.forEach(item=>{
            if(item.cType == 0){
                item.cTypeDec = '必修'
            }
            if(item.cType == 1){
                item.cTypeDec = '选修'
            }
        })
    }

    operateButton(value,row){
        /**修改**/
        if(value == 0){

        }
        /**删除**/
        if(value == 1){

        }
    }

    /**修改每页展示的数据条数pageSize**/
    getLimit(event) {
        Object.assign(this.params, {limit: event})
        this.reloadTeacherCourseListData()
    }

    /**点击 顶部右侧"新建"按钮**/
    addCourse() {
        this.newDialog()
    }

    /**打开 新建dialog**/
    newDialog() {
        const config = SysTeacherCourseDialogComponent.config
        let dialogRef = this._dialog.open(SysTeacherCourseDialogComponent, config)
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result && result !== 'cancel') {
                console.log('确定', result)
                this.reloadTeacherCourseListData()
            }
            config.data = {}
            dialogRef = null
        })
    }
}
