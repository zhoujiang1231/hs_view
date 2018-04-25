import {Injectable} from '@angular/core'
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
} from '@angular/router'
import {ConnectionService} from './connection.service'
import {DataService} from "./data.service";
import {LocalStorage} from "./localstorage.service";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router,
              private connectionService: ConnectionService,
              private dataService:DataService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url

    return this.checkLogin(url)
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state)
  }

  checkLogin(url: string): boolean {
    if (LocalStorage.get('user')) {
        this.dataService.changRolePermission()
        return true
    } else {
      this.router.navigate(['/signin'])
      localStorage.clear()
      return false
    }
  }
}
