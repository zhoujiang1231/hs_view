import {Injectable} from '@angular/core'
import axios from 'axios'

import {ConstantService} from './constant.service'
import appAlert from '../../utils/alert'
import {Router} from '@angular/router'

@Injectable()
export class ConnectionService {
  public isLogin: boolean
  private instance = axios.create({
    baseURL: ConstantService.HOST,
    withCredentials: true,
    headers: {}
  })

  constructor(private router: Router) {
    this.isLogin = true
  }

  /**
   * @desc 获取指定的资源（base_url/resource?name='xxx'）
   * @param {string} path - 资源定位器
   * @param params - 资源定位器
   */
  get(path: string, params?: any) {
    if (params) {
      return this.instance.get(path, params)
    } else {
      return this.instance.get(path)
    }
  }

  /**
   * @desc 修改指定id的资源（base_url/resource/id）
   * @param {string} path - 资源定位器
   * @param data - 资源定位器
   */
  put(path: string, data: any) {
    return this.instance.put(path, data)
  }

  /**
   * @desc 删除指定id的资源（base_url/resource/id）
   * @param {string} path - 资源定位器
   */
  delete(path: string, data?: any) {
    if (data) {
      return this.instance.delete(path, data)
    } else {
      return this.instance.delete(path)
    }
  }

  /**
   * @desc 保存指定的资源（base_url/resource）
   * @param {string} path - 资源定位器
   * @param data - 资源定位器
   */
  post(path: string, data?: any) {
    if (data) {
      return this.instance.post(path, data)
    } else {
      return this.instance.post(path)
    }
  }

  login() {
    this.isLogin = true
  }

  logout() {
    this.isLogin = false
  }

  /**根据返回的错误提示，判断是否未登录**/
  isLoginByResult(msg, note) {
    if (msg.includes('未登录')) {
      this.logout()
      this.router.navigate(['/signin'])
      localStorage.clear()
    } else {
      console.log(msg)
      appAlert.common.actionFailed(`请求"${note}"`)
    }
  }

  /**创建a标签，实现点击下载**/
  createA(url, filename) {
    const eleLink: any = document.createElement('a')
    eleLink.download = filename
    eleLink.style.display = 'none'
    eleLink.href = url
    document.body.appendChild(eleLink)
    eleLink.click()
    document.body.removeChild(eleLink)
  }
}
