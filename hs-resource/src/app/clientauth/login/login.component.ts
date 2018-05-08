import {Component, OnInit} from '@angular/core'
import {LocalStorage} from '../../core/services/localstorage.service'
import {ConnectionService} from '../../core/services/connection.service'
import {Router} from '@angular/router'
import {ConstantService} from '../../core/services/constant.service'
import appAlert from '../../utils/alert'
import {DataService} from "../../core/services/data.service";

@Component({
    selector: 'app-attendant-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.less']
})

export class LoginComponent implements OnInit {
    public user: any = {userType:'0'}
    public isClick = false
    private isWriteObj: any = {}
    codePath

    constructor(private connectionService: ConnectionService,
                private router: Router,
                private dataService: DataService) {
    }

    ngOnInit() {
        this.getCode()
        if (LocalStorage.get('user') && LocalStorage.get('operator')) {
            this.router.navigate(['/index'])
            this.dataService.changRolePermission()
        }
    }

    login(model: any) {
        this.isClick = true
        const path = '/user/login'
        const params: any = {}
        params.userName = model.userName
        params.authCode = model.password
        params.securityCode = model.securityCode
        params.userType = model.userType
        LocalStorage.remove('user')
        this.connectionService.post(path, params)
            .then(res => {
                if (res.data.result === '0') {
                    this.connectionService.login()
                    this.router.navigate(['/index'])
                    if (res.data.data) {
                        const user = res.data.data
                        LocalStorage.set('user', user)
                        LocalStorage.set('userType', user.userType)
                        this.dataService.changRolePermission()
                    } else {// ：已登录状态，请先登出
                        appAlert.login.failed(res.data.msg)
                    }
                } else {
                    appAlert.login.failed(res.data.msg)
                    this.getCode()
                }
            })
            .catch(err => {
                appAlert.login.failed('登录名或登录密码不正确，请重试！')
                this.getCode()
            })
    }

    /**
     * @desc 判断是否输入
     */
    isWrite(value) {
        this.isWriteObj[value] = true
    }

    /**
     * @desc 点击验证码后重新获取验证码
     */
    getCode() {
        this.codePath = ConstantService.HOST + '/user/loginSecurityCodeImage?' + Math.random()
    }

    trimCode() {
        let code
        if (this.user.securityCode) {
            code = this.user.securityCode.replace(/\s/g, '')
        }
        if (code && code.length > 0) {
            return false
        } else {
            return true
        }
    }

}
