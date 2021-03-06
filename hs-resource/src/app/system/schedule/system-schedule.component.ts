import {Component, OnInit} from '@angular/core'
import {MatDialog} from '@angular/material'
import {SysScheduleService} from "./sys-schedule.service";
import {LocalStorage} from "../../core/services/localstorage.service";
import {Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {ConstantService} from "../../core/services/constant.service";

@Component({
    selector: 'app-system-schedule',
    templateUrl: 'system-schedule.component.html',
    styleUrls: ['system-schedule.component.less']
})

export class SystemScheduleComponent implements OnInit {
    scheduleListData: any[] = []
    params: any = {}
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
                private sysScheduleService: SysScheduleService) {
        this.downiframe = this.sanitizer.bypassSecurityTrustResourceUrl('')
    }

    ngOnInit() {
        if(LocalStorage.get('userType')){
            this.userType = LocalStorage.get('userType')
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
        this.sysScheduleService.reloadSelectCousrseData(this.params)
            .subscribe(page => {
                this.isSpinner = 0
                if (page.data.result == '0') {
                    this.isSpinner = 0
                    this.scheduleListData = [...page.data.list]
                    this.loadingIndicator = false
                }
            })
    }

    /**导出课表**/
    exportSchedule(){
        this.downiframe = this.sanitizer.bypassSecurityTrustResourceUrl(ConstantService.HOST+'/schedule/exportSchedule')
    }
}
