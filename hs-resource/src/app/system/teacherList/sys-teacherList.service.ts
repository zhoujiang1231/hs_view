import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import appAlert from '../../utils/alert'
import {ConnectionService} from '../../core/services/connection.service'

@Injectable()
export class SysTeacherListService {

  constructor(private connectionService: ConnectionService) {
  }

  /**获取教师列表：get**/
  reloadTeacherListData(params) {
    const path = '/teacher/getAllTeacher'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      if (page.data.result === '0') {
        //if (page.data.permission === 0) {/*请求数据"成功"*/
      /*    this.TeacherListData.length = 0
          this.TeacherListData.push(...page.data.list)*/
        //}
      } else {
        this.connectionService.isLoginByResult(page.data.description, '获取教师列表')
      }
    }, err => {
      appAlert.common.actionFailed('"获取教师列表"')
    })
    return configsObservable
  }

    /**获取教师IDANDNAME列表：get**/
    reloadTeacherIdAndName() {
        const path = '/teacher/getAllTeacherIdAndName'
        const configsObservable = Observable.fromPromise(this.connectionService.get(path))
        return configsObservable
    }

    /**删除教师：post**/
    deleteTeacher(id) {
        const path = '/teacher/deleteTeacher/' + id
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
    addTeacher(params, dialogRef, disabled?) {
        const path = '/teacher/addTeacher'
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
