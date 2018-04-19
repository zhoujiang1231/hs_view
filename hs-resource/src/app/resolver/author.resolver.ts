import {Injectable} from '@angular/core'
import {Router, Resolve} from '@angular/router'
import {ConnectionService} from '../core/services/connection.service'
import {LocalStorage} from '../core/services/localstorage.service'


@Injectable()
export class AuthorResolver implements Resolve<any> {
  constructor(private connectionService: ConnectionService,
              private router: Router) {
  }

  /**根据请求"角色列表"接口，判断是否登录**/
  resolve() {
    const path = '/api/system/roles'
    this.connectionService.get(path)// 此处get返回的是promise对象，用then...catch处理数据
      .then(res => {
        if (res.data.status === 0) {// 请求成功，是登录状态
          LocalStorage.set('roles', res.data.result)
          this.connectionService.login()
        } else {
          this.connectionService.logout()
          this.router.navigate(['/signin'])
          localStorage.clear()
        }
      })
      .catch(err => {// 请求失败，未登录状态，跳转到登录页
        this.connectionService.logout()
        this.router.navigate(['/signin'])
        localStorage.clear()
      })
  }
}
