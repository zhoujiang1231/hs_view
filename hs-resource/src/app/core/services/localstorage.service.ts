import {Injectable} from '@angular/core'

@Injectable()
export class LocalStorage {

  public static localStorage: any = window.localStorage

  constructor() {
    if (!LocalStorage.localStorage) throw new Error('您的浏览器不支持本地存储（LocalStorage）！')
  }

  public static set(key: string, value: any): void {
    LocalStorage.localStorage.setItem(key, JSON.stringify(value))
  }

  public static get(key: string): string {
    let value = LocalStorage.localStorage.getItem(key)
    try {
      value = JSON.parse(value)
    } catch (e) {
    }
    return value
  }

  public static remove(key: string): any {
    LocalStorage.localStorage.removeItem(key)
  }
}
