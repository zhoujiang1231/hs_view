import {Injectable} from '@angular/core'
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
} from '@angular/router'
import {ConnectionService} from './connection.service'

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router,
              private connectionService: ConnectionService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url

    return this.checkLogin(url)
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state)
  }

  checkLogin(url: string): boolean {
    if (this.connectionService.isLogin) {
      return true
    } else {
      this.router.navigate(['/signin'])
      localStorage.clear()
      return false
    }
  }
}
