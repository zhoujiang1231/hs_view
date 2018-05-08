import {Component, OnInit} from '@angular/core'
import {MatDialog} from '@angular/material'
import appAlert from '../../utils/alert'
import {SysGradeListService} from "./sys-gradeList.service";
import {LocalStorage} from "../../core/services/localstorage.service";
import {Router} from "@angular/router";
import {SysGradeListDialogComponent} from "./sys-gradeList.dialog";
import {SysTeacherCourseDialogComponent} from "../teacherCourseList/sys-teacherCourse.dialog";

@Component({
    selector: 'app-system-gradeList',
    templateUrl: 'system-gradeList.component.html',
    styleUrls: ['system-gradeList.component.less']
})

export class SystemGradeListComponent implements OnInit {
    gradeListData: any[] = []
    teacherCourses: any[] = []
    params: any = {start:1,limit:20}
    totalCount
    /**请求后端数据的参数**/
    loadingIndicator = true
    isPermission = 0// 是否有权限
    isSpinner // 加载进度
    user
    userType

    constructor(private router: Router,
                public _dialog: MatDialog,
                private sysGradeListService: SysGradeListService) {
    }

    ngOnInit() {
        if(LocalStorage.get('userType')){
            this.userType = LocalStorage.get('userType')
        }
        if(this.userType == '1'){
            this.isPermission =1
        }
        if(LocalStorage.get('grade_cId')){
            this.params.cId = LocalStorage.get('grade_cId')
        }
        if(this.params.cId){
            this.reloadGradeListData()
        }
    }

    search(){
        if(!this.params.cId){
            appAlert.common.confirmWarning('请输入课程编号！')
            return
        }
        else{
            this.reloadGradeListData()
        }
    }

    /**加载 成绩 数据**/
    reloadGradeListData() {
        this.isSpinner = 1
        this.loadingIndicator = true
        this.sysGradeListService.reloadGradeListData(this.params)
            .subscribe(page => {
                this.isSpinner = 0
                if (page.data.result == '0') {
                    this.isSpinner = 0
                    // if (page.data.permission === 0) {
                    this.isPermission = 1
                    this.totalCount = page.data.page.total
                    this.gradeListData = [...page.data.list]
                    this.formatData(this.gradeListData)
                    this.loadingIndicator = false
                    this.isPermission = 1
                }
                else{
                    this.gradeListData = []
                }
            })
    }

    operateButton(value,row){
        /**修改**/
        if(value == 0){
            this.newDialog(row)
        }
        /**删除**/
        if(value == 1){
            appAlert.common.remove('成绩',() => {
                this.sysGradeListService.deleteGrade(row.gId)
                    .subscribe(res =>{
                        if(res.data.result == '0'){
                            this.reloadGradeListData()
                        }
                    })
            })
        }
    }

  /*  /!**加载教师所有的课程数据**!/
    reloadTeacherCourses() {
        this.sysGradeListService.reloadTeacherCourseListData()
            .subscribe(page => {
                if (page.data.result == '0') {
                    this.teacherCourses = [...page.data.list]
                }
            })
    }*/

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
        this.reloadGradeListData()
    }

    /**点击 顶部右侧"新建"按钮**/
    addGrade() {
        this.newDialog()
    }

    /**打开 新建dialog**/
    newDialog(data?) {
        const config = SysGradeListDialogComponent.config
        if(data){
            config.data = data
        }
        let dialogRef = this._dialog.open(SysGradeListDialogComponent, config)
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result && result !== 'cancel') {
                this.reloadGradeListData()
            }
            config.data = {}
            dialogRef = null
        })
    }
}
