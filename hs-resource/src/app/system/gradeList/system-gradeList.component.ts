import {Component, OnInit} from '@angular/core'
import {MatDialog} from '@angular/material'
import appAlert from '../../utils/alert'
import {SysGradeListService} from "./sys-gradeList.service";
import {LocalStorage} from "../../core/services/localstorage.service";
import {Router} from "@angular/router";
import {SysGradeListDialogComponent} from "./sys-gradeList.dialog";

@Component({
    selector: 'app-system-gradeList',
    templateUrl: 'system-gradeList.component.html',
    styleUrls: ['system-gradeList.component.less']
})

export class SystemGradeListComponent implements OnInit {
    gradeListData: any[] = []
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
                private courseListService: SysGradeListService) {
    }

    ngOnInit() {
        if(LocalStorage.get('userType')){
            this.userType = LocalStorage.get('userType')
        }
        if(this.userType ==0 || this.userType ==1){
            this.isPermission =1
        }
        if(this.userType == 2){
            this.user = LocalStorage.get('user')
            this.isStudent = 1
        }
        this.reloadCourseListData()
    }


    /**加载 课程列表 数据**/
    reloadCourseListData() {
        this.isSpinner = 1
        this.loadingIndicator = true
        this.courseListService.reloadCourseListData(this.params)
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

    /**选课**/
    choseCourse(element,row){
        /**获取点击后的checked**/
        let checkTarget = element.srcElement.checked
        let checkOld
        let cId = row.cId
        /**选课**/
        if(checkTarget){
            checkOld = false;
            if(row.cChosed>=row.cTotal){
                appAlert.common.actionFailed('该课程人数已满!')
                element.srcElement.checked = checkOld
                return
            }
            this.courseListService.choseCourse({cId:cId})
                .subscribe(res => {
                    if(res.data.result == '0'){
                        LocalStorage.set('user',res.data.data)
                        this.user = LocalStorage.get('user')
                        this.reloadCourseListData()
                    }
                    else{
                        element.srcElement.checked = checkOld
                    }
                }, err => {
                    element.srcElement.checked = checkOld
                })
        }/**取消选课**/
        else{
            checkOld = true;
            this.courseListService.unchoseCourse({cId:cId})
                .subscribe(res => {
                    if(res.data.result == '0'){
                        LocalStorage.set('user',res.data.data)
                        this.user = LocalStorage.get('user')
                        this.reloadCourseListData()
                    }
                    else{
                        element.srcElement.checked = checkOld
                    }
                }, err => {
                    element.srcElement.checked = checkOld
                })
        }
    }

    courseChecked(cId){
        let flag = false;
        this.user.lc.forEach(item =>{
            if(cId == item.cId){
                flag = true;
            }
        })
        return flag;
    }
    courseUnChecked(cId){
        let flag = true;
        this.user.lc.forEach(item =>{
            if(cId == item.cId){
                flag = false;
            }
        })
        return flag;
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
        const config = SysGradeListDialogComponent.config
        let dialogRef = this._dialog.open(SysGradeListDialogComponent, config)
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
