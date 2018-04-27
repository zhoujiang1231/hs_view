import {Component, OnInit} from '@angular/core'
import {MatDialog} from '@angular/material'
import appAlert from '../../../utils/alert'
import {SysAccountService} from "../sys-account.service";
import {LocalStorage} from "../../../core/services/localstorage.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-system-accountInfo',
    templateUrl: 'system-accountInfo.component.html',
    styleUrls: ['system-accountInfo.component.less']
})

export class SystemAccountInfoComponent implements OnInit {
    studentInfo: any = {}
    isPermission  = 0// 是否有权限

    constructor(private router: Router,
                public _dialog: MatDialog,
                private sysAccountService: SysAccountService) {
    }

    ngOnInit() {
        if (LocalStorage.get('userType')&&LocalStorage.get('user')) {
            if(LocalStorage.get('userType') == '2') {
                this.isPermission = 1
                this.studentInfo = LocalStorage.get('user')
            }
        }
    }
    updateInfo(){
        this.sysAccountService.updateStudentInfo(this.studentInfo)
            .subscribe(res =>{
                if(res.data.result == '0'){
                    LocalStorage.set('user',this.studentInfo)
                }
            })
    }

}
