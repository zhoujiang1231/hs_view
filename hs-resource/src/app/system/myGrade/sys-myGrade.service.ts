import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import appAlert from '../../utils/alert'
import {ConnectionService} from '../../core/services/connection.service'

@Injectable()
export class SysMyGradeService {

  constructor(private connectionService: ConnectionService) {
  }

  /**获取成绩列表：get**/
  reloadMyGradeData(params) {
    const path = '/studentGrade'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      if (page.data.result == '0') {
        //if (page.data.permission === 0) {/*请求数据"成功"*/
      /*    this.selectCourseData.length = 0
          this.selectCourseData.push(...page.data.list)*/
        //}
      } else {
          console.log(page.data)
        this.connectionService.isLoginByResult(page.data.result, page.data.msg)
      }
    }, err => {
      appAlert.common.actionFailed('成绩列表')
    })
    return configsObservable
  }
}
