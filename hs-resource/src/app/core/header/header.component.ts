import {Component} from '@angular/core'
import {Router} from '@angular/router'

import {LocalStorage} from '../services/localstorage.service'
import {ConnectionService} from '../services/connection.service'
import appAlert from '../../utils/alert'

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.less'],
})

export class HeaderComponent {
  user: any = LocalStorage.get('user')
  appName: any = LocalStorage.get('appName')

  constructor(private router: Router,
              private connectionService: ConnectionService) {
  }


  exit() {
    // console.log('exit_user', this.user)
    const path = '/api/logout'
    this.connectionService.post(path)
      .then(res => {
        if (res.data.status === 0) {
          this.connectionService.logout()
          this.router.navigate(['/signin'])
          localStorage.clear()
        } else {
          appAlert.login.failed('退出登录失败，请重试！')
        }
      }).catch(error => {
      appAlert.login.failed('退出登录失败，请重试！')
    })
  }
}
