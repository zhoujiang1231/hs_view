import {Component, OnInit} from '@angular/core'
import appAlert from '../../../utils/alert'
import {SysAccountService} from "../sys-account.service";
import {LocalStorage} from "../../../core/services/localstorage.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-system-accountPsw',
    templateUrl: 'system-accountPsw.component.html',
    styleUrls: ['system-accountPsw.component.less']
})

export class SystemAccountPswComponent implements OnInit {
    params: any = {}
    validationParams: any = {}
    oldPsw
    constructor(private router: Router,
                private sysAccountService: SysAccountService) {
    }

    ngOnInit() {
        const user:any = LocalStorage.get('user')
        const userType = LocalStorage.get('userType')
        if(userType == "0"){
            this.oldPsw = user.adminPassword
            this.params.userId = user.adminId
        }
        if(userType == "1"){
            this.oldPsw = user.tPassword
            this.params.userId = user.tId
        }
        if(userType == "2"){
            this.oldPsw = user.stuPassword
            this.params.userId = user.stuId
        }
    }

    updatePsw(){
        if(this.validationParams.oldPsw!=this.oldPsw ){
            appAlert.common.confirmWarning('旧密码输入错误！')
        }
        else if(this.validationParams.authCode != this.params.authCode){
            appAlert.common.confirmWarning('两次密码不一致！')
        }
        else {
            this.sysAccountService.updatePsw(this.params)
        }
    }

    validationAuthCode(model){
        if(model == 0){

        }
        if(model == 1){

        }
    }

}
