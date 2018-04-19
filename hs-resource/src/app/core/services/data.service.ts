import {Injectable} from '@angular/core'
import {observable, action} from 'mobx-angular'
import {ConstantService} from '../services/constant.service'

@Injectable()
export class DataService {
  @observable leftArray: any = {}
  @observable permission: any = {}
  @observable navTabs: any = ConstantService.navTabs

  /**
   * @desc 监控左侧菜单收展状态
   * @param left - 左侧菜单宽度
   */
  @action
  changeLeft(left) {
    const mleft = left + 'px'
    const sleft = 180 + left - 20 + 'px'
    const leftArr = {mleft: mleft, sleft: sleft}
    Object.assign(this.leftArray, leftArr)

  }

  @action
  set(value) {
    Object.assign(this.permission, value)
  }

  @action
  changeNavBar(navs) {
    Object.assign(this.navTabs, navs)
  }

  @action
  changeSidBar(value) {
    const navs: any = []
    const href = window.location.href
    const afterHref = href
    ConstantService.navTabs.forEach((navTab) => {
      if (navTab.mark && value.indexOf(navTab.mark) < 0) {
        navTab.show = false
      }
      if (afterHref.indexOf(navTab.link) > 0) {
        navTab.open = true
      }
      navTab.children.forEach((nav) => {
        if (value.indexOf(nav.mark) < 0) {
          nav.show = false
        }
      })
      navs.push(navTab)
    })
    Object.assign(this.navTabs, navs)
    // Object.assign(this.navTabs,ConstantService.navTabs);

  }

}
