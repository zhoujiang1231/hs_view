import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import {ConnectionService} from '../core/services/connection.service'
import appAlert from '../utils/alert'

@Injectable()
export class PhoneNoteService {
  @observable phoneNoteData: any [] = []

  constructor(private connectionService: ConnectionService) {}

  /**获取话单列表：get**/
  reloadPhoneNote(params) {
    const path = '/api/cdrs'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      console.log('获取话单列表', page.data.msg, page.data.status)
      if (page.data.status === 0) {/*请求数据"成功"*/
        this.phoneNoteData = page.data.result
      } else {
        this.connectionService.isLoginByResult(page.data.msg, '话单列表')
      }
    }, err => {
      appAlert.common.actionFailed('请求"话单列表"')
    })
    return configsObservable
  }
}
