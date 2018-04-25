import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import appAlert from '../../utils/alert'
import {ConnectionService} from '../../core/services/connection.service'
import {ConstantService} from "../../core/services/constant.service";

@Injectable()
export class SysPreDeductLogService {
  /*@observable sysPreDeductLogData: any[] = []*/

  constructor(private connectionService: ConnectionService) {
  }

  /**获取预消费日志：get**/
  reloadPaylogsData(params) {
    const path = '/preDeductLogs'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      // console.log('获取直销部门列表', page.data.msg, page.data.status)
      if (page.data.result === '0') {
        //if (page.data.permission === 0) {/*请求数据"成功"*/
          /*this.sysPreDeductLogData.length = 0
          this.sysPreDeductLogData.push(...page.data.list)*/
        //}
      } else {
        this.connectionService.isLoginByResult(page.data.description, '预消费日志')
      }
    }, err => {
      appAlert.common.actionFailed('请求"预消费日志"')
    })
    return configsObservable
  }

}
