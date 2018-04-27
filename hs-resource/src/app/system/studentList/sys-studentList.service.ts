import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import appAlert from '../../utils/alert'
import {ConnectionService} from '../../core/services/connection.service'

@Injectable()
export class SysStudentListService {

  constructor(private connectionService: ConnectionService) {
  }

  /**获取学生列表：get**/
  reloadStudentListData(params) {
    const path = '/student/getAllStudent'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
        console.log(page.data)
      if (page.data.result == '0') {
      } else {
          if(page.data.result == '10') {
              this.connectionService.isLoginByResult(page.data.result, page.data.msg)
          }
      }
    }, err => {
      appAlert.common.actionFailed('获取学生列表"')
    })
    return configsObservable
  }

    /**删除学生：post**/
    deleteStudent(id) {
        const path = '/student/deleteStudent/' + id
        const configsObservable = Observable.fromPromise(this.connectionService.delete(path))
        configsObservable.subscribe(res => {
            if (res.data.result === '0') {
                appAlert.common.actionSuccess('删除成功')
            } else {
                console.log(res.data.description)
                appAlert.common.actionFailed(res.data.msg)
            }
        }, err => {
            appAlert.common.actionFailed('删除失败')
        })
        return configsObservable
    }

    /*添加学生：post**/
    addStudent(params, dialogRef, disabled?) {
        const path = '/student/addStudent'
        const configsObservable = Observable.fromPromise(this.connectionService.post(path,params))
        configsObservable.subscribe(res => {
            if (res.data.result === '0') {
                dialogRef.close('success')
                appAlert.common.actionSuccess('添加成功')
            } else {
                if (disabled) {disabled.value = false}
                console.log(res.data.description)
                appAlert.common.actionFailed(res.data.msg)
            }
        }, err => {
            appAlert.common.actionFailed('添加失败')
        })
        return configsObservable
    }
}
