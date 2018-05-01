import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import appAlert from '../../utils/alert'
import {ConnectionService} from '../../core/services/connection.service'

@Injectable()
export class SysTeacherCourseListService {

  constructor(private connectionService: ConnectionService) {
  }

  /**获取课程列表：get**/
  reloadCourseListData(params) {
    const path = '/course/getAllCourse'
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
      appAlert.common.actionFailed('课程列表')
    })
    return configsObservable
  }

    /**添加课程：post**/
    addCourse(params, dialogRef, disabled?) {
        const path = '/course/addCourse'
        console.log(params)
        const configsObservable = Observable.fromPromise(this.connectionService.get(path,params))
        configsObservable.subscribe(res => {
            if (res.data.result === '0') {
                dialogRef.close('success')
                appAlert.common.actionSuccess('添加成功')
            } else {
                if (disabled) {disabled.value = false}
                appAlert.common.actionFailed(res.data.msg)
            }
        }, err => {
            appAlert.common.actionFailed('添加失败')
        })
        return configsObservable
    }

    /**获取教师对应课程列表：get**/
    reloadTeacherCourseListData(params) {
        const path = '/course/getAllTeacherCourse'
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
            appAlert.common.actionFailed('课程列表')
        })
        return configsObservable
    }
}
