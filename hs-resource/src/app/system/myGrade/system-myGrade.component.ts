import {Component, OnInit} from '@angular/core'
import {MatDialog} from '@angular/material'
import {SysMyGradeService} from "./sys-myGrade.service";
import {LocalStorage} from "../../core/services/localstorage.service";
import {Router} from "@angular/router";
import {SysCourseListService} from "../courseList/sys-courseList.service";
import {DomSanitizer} from "@angular/platform-browser";
import {ConstantService} from "../../core/services/constant.service";

@Component({
    selector: 'app-system-myGrade',
    templateUrl: 'system-myGrade.component.html',
    styleUrls: ['system-myGrade.component.less']
})

export class SystemMyGradeComponent implements OnInit {
    myGradeListData: any[] = []
    myCourseListData: any[] = []
    params: any = {start:1,limit:20}
    totalCount
    /**请求后端数据的参数**/
    loadingIndicator = true
    isSpinner // 加载进度
    user
    userType
    isStudent = 0
    downiframe:any

    constructor(private router: Router,
                public _dialog: MatDialog,
                private sanitizer: DomSanitizer,
                private sysMyGradeService: SysMyGradeService,
                private sysCourseListService: SysCourseListService) {
        this.downiframe = this.sanitizer.bypassSecurityTrustResourceUrl('')

    }

    ngOnInit() {
        if(LocalStorage.get('userType')){
            this.userType = LocalStorage.get('userType')
        }
        if(this.userType == 2){
            this.user = LocalStorage.get('user')
            this.isStudent = 1
            this.params.stuId = this.user.stuId
            this.reloadMyGradeData()
        }
    }


    /**加载 成绩列表 数据**/
    reloadMyGradeData() {
        this.isSpinner = 1
        this.loadingIndicator = true
        this.sysMyGradeService.reloadMyGradeData(this.params)
            .subscribe(page => {
                this.isSpinner = 0
                if (page.data.result == '0') {
                    this.isSpinner = 0
                    // if (page.data.permission === 0) {
                    this.totalCount = page.data.page.total
                    this.myGradeListData = [...page.data.list]
                    this.reloadMyCourseData()
                    this.loadingIndicator = false
                }
            })
    }
    /**加载 课程列表 数据**/
    reloadMyCourseData() {
        this.isSpinner = 1
        this.loadingIndicator = true
        this.sysCourseListService.reloadAllCourse()
            .subscribe(page => {
                this.isSpinner = 0
                if (page.data.result == '0') {
                    this.myCourseListData = [...page.data.list]
                    this.formatData(this.myGradeListData,this.myCourseListData)
                }
            })
    }

    formatData(row1,row2){
        row1.forEach(gradeItem=>{
            row2.forEach(item =>{
            if(item.cType == 0){
                gradeItem.cTypeDec = '必修'
            }
            if(item.cType == 1){
                gradeItem.cTypeDec = '选修'
            }
            if(gradeItem.cId == item.cId){
                gradeItem.cName = item.cName
                gradeItem.cTeacher = item.cTeacher
                gradeItem.tId = item.tId
            }
        })
        })
    }

    /**修改每页展示的数据条数pageSize**/
    getLimit(event) {
        Object.assign(this.params, {limit: event})
        this.reloadMyGradeData()
    }

    /**导出课表**/
    exportGrade(){
        this.downiframe = this.sanitizer.bypassSecurityTrustResourceUrl(ConstantService.HOST+'/grade/exportGrade')
    }
}
