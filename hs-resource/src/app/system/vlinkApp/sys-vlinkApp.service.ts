import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import appAlert from '../../utils/alert'
import {ConnectionService} from '../../core/services/connection.service'

@Injectable()
export class SysVlinkAppService {
  /*@observable sysVlinkAppData: any[] = []
  @observable departMentArr: any[] = []*/

  constructor(private connectionService: ConnectionService) {
      /*this.departMentArr.push({id:'',fullName:'全部'})*/
  }

  /**获取应用列表：get**/
  reloadVlinkApp(params) {
    const path = '/vlinkApps'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      // console.log('获取直销部门列表', page.data.msg, page.data.status)
      if (page.data.result === '0') {
        //if (page.data.permission === 0) {/*请求数据"成功"*/
          /*this.sysVlinkAppData.length = 0
          this.sysVlinkAppData.push(...page.data.list)*/
        //}
      } else {
        this.connectionService.isLoginByResult(page.data.description, '应用列表')
      }
    }, err => {
      appAlert.common.actionFailed('请求"应用列表"')
    })
    return configsObservable
  }

    /**获取所属部门下拉框：get**/
    reloaddirectDepartmentIdAndName() {
        const path = '/directDepartmentIdAndName'
        const configsObservable = Observable.fromPromise(this.connectionService.get(path, null))
        configsObservable.subscribe((page: any) => {
            // console.log('获取直销部门列表', page.data.msg, page.data.status)
            if (page.data.result === '0') {
                //if (page.data.permission === 0) {/*请求数据"成功"*/
                /*this.departMentArr.length = 0
                this.departMentArr.push(...page.data.list)*/
                //}
            } else {
                this.connectionService.isLoginByResult(page.data.description, '所属部门下拉框')
            }
        }, err => {
            appAlert.common.actionFailed('请求"所属部门下拉框"')
        })
        return configsObservable
    }

}
