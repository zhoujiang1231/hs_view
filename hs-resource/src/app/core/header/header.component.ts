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
  private user = LocalStorage.get('user')

  constructor(private router: Router,
              private connectionService: ConnectionService) {
  }


  exit() {
    const path = '/user/logout'
    this.connectionService.get(path)
      .then(res => {
        if (res.data.result === '0') {
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
