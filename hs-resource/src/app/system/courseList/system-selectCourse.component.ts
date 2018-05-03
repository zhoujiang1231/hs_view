import {Component, OnInit} from '@angular/core'
import {MatDialog} from '@angular/material'
import appAlert from '../../utils/alert'
import {SysCourseListService} from "./sys-courseList.service";
import {LocalStorage} from "../../core/services/localstorage.service";
import {Router} from "@angular/router";
import {SysCourseListDialogComponent} from "./sys-course.dialog";

@Component({
    selector: 'app-system-selectCourse',
    templateUrl: 'system-selectCourse.component.html',
    styleUrls: ['system-selectCourse.component.less']
})

export class SystemSelectCourseComponent implements OnInit {
    selectCourseData: any[] = []
    params: any = {start:1,limit:20}
    totalCount
    /**请求后端数据的参数**/
    loadingIndicator = true
    isPermission = 1// 是否有权限
    isSpinner // 加载进度

    constructor(private router: Router,
                public _dialog: MatDialog,
                private courseListService: SysCourseListService) {
    }

    ngOnInit() {
        if(LocalStorage.get('userType')&&LocalStorage.get('userType')=='2'){
            this.isPermission = 1
            this.reloadSelectCousrseData()
        }
    }


    /**加载 学生已选课程 数据**/
    reloadSelectCousrseData() {
        this.isSpinner = 1
        this.loadingIndicator = true
        this.courseListService.reloadSelectCousrseData(this.params)
            .subscribe(page => {
                this.isSpinner = 0
                if (page.data.result == '0') {
                    this.isSpinner = 0
                    // if (page.data.permission === 0) {
                    this.isPermission = 1
                    this.totalCount = page.data.page.total
                    this.selectCourseData = [...page.data.list]
                    this.formatData(this.selectCourseData)
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
        this.reloadSelectCousrseData()
    }

    unchoseCourse(row){
        this.courseListService.unchoseCourse({cId:row.cId})
            .subscribe(res => {
                if(res.data.result == '0'){
                    LocalStorage.set('user',res.data.data)
                    this.reloadSelectCousrseData()
                }
            })
    }
}
