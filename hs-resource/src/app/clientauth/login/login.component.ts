import {Component, OnInit} from '@angular/core'
import {LocalStorage} from '../../core/services/localstorage.service'
import {ConnectionService} from '../../core/services/connection.service'
import {Router} from '@angular/router'
import {ConstantService} from '../../core/services/constant.service'
import appAlert from '../../utils/alert'

@Component({
  selector: 'app-attendant-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.less']
})

export class LoginComponent implements OnInit {
  public user: any = {}
  public isClick = false
  isWriteObj: any = {}
  codePath

  constructor(private connectionService: ConnectionService,
              private router: Router) {
  }

  ngOnInit() {
    this.getCode()
    if (LocalStorage.get('user') && LocalStorage.get('username')) {
      this.router.navigate(['/index'])
    }
  }

  login(model: any) {
    this.isClick = true
    const path = '/api/login'
    const params: any = {}
    params.userName = model.username
    params.authCode = model.password
    params.securityCode = model.securityCode
    LocalStorage.remove('user')
    this.connectionService.post(path, params)
      .then(res => {
        // console.log('res', res)
        if (res.data.status === 0) {
          this.connectionService.login()
          this.router.navigate(['/index'])
          if (res.data.result) {
            // const user = res.data.result
            LocalStorage.set('appName', res.data.result.appName)
            const user = res.data.result.user
            LocalStorage.set('user', user)
            LocalStorage.set('username', user.username)
          } else {// ：已登录状态，请先登出
            appAlert.login.failed(res.data.msg)
          }
        } else {
          appAlert.login.failed('登录名或登录密码不正确，请重试！')
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
    this.codePath = ConstantService.HOST + '/api/loginSecurityCodeImage?' + Math.random()
    // this.codePath = '/api/loginSecurityCodeImage?' + Math.random() // *****上传到线上时使用
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
