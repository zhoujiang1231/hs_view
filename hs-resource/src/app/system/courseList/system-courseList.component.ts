import {Component, OnInit} from '@angular/core'
import {MatDialog} from '@angular/material'
import appAlert from '../../utils/alert'
import {SysCourseListService} from "./sys-courseList.service";
import {LocalStorage} from "../../core/services/localstorage.service";
import {Router} from "@angular/router";
import {SysCourseListDialogComponent} from "./sys-course.dialog";

@Component({
    selector: 'app-system-courseList',
    templateUrl: 'system-courseList.component.html',
    styleUrls: ['system-courseList.component.less']
})

export class SystemCourseListComponent implements OnInit {
    courseListData: any[] = []
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
                private courseListService: SysCourseListService) {
    }

    ngOnInit() {
        if (LocalStorage.get('appDeductDetailLogAppId') && LocalStorage.get('appDeductDetailLogDeductMonth')) {
            this.params.appId = LocalStorage.get('appDeductDetailLogAppId')
            this.params.deductMonth = LocalStorage.get('appDeductDetailLogDeductMonth')
            this.reloadCourseListData()
        }
        this.reloadCourseListData()
    }


    /**加载 应用账单 数据**/
    reloadCourseListData() {
        this.isSpinner = 1
        this.loadingIndicator = true
        this.courseListService.reloadCourseListData(this.params)
            .subscribe(page => {
                this.isSpinner = 0
                if (page.data.result === '0') {
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

    /**修改每页展示的数据条数pageSize**/
    getLimit(event) {
        Object.assign(this.params, {limit: event})
        this.reloadCourseListData()
    }

    deleteCourse(row){
        appAlert.common.remove('课程',() => {
            this.courseListService.deleteCourse(row.cId)
                .subscribe(res =>{
                    if(res.data.result == 0){
                        this.reloadCourseListData()
                    }
                })
        })
    }
    /**点击 顶部右侧"新建"按钮**/
    addCourse() {
        this.newDialog()
    }

    /**打开 新建dialog**/
    newDialog() {
        const config = SysCourseListDialogComponent.config
        let dialogRef = this._dialog.open(SysCourseListDialogComponent, config)
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result && result !== 'cancel') {
                console.log('确定', result)
                this.reloadCourseListData()
            }
            config.data = {}
            dialogRef = null
        })
    }
}
