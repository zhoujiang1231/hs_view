import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import appAlert from '../../utils/alert'
import {ConnectionService} from '../../core/services/connection.service'

@Injectable()
export class SysScheduleService {

  constructor(private connectionService: ConnectionService) {
  }

    /**获取已选课程列表：get**/
    reloadSelectCousrseData(params) {
        const path = '/course/getAllStudentCourse'
        const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
        configsObservable.subscribe((page: any) => {
            if (page.data.result == '0') {
                //if (page.data.permission === 0) {/*请求数据"成功"*/
                /*    this.selectCourseData.length = 0
                    this.selectCourseData.push(...page.data.list)*/
                //}
            } else {
                this.connectionService.isLoginByResult(page.data.result, page.data.msg)
            }
        }, err => {
            appAlert.common.actionFailed('课程列表')
        })
        return configsObservable
    }

}
