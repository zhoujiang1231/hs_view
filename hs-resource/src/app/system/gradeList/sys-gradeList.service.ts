import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import appAlert from '../../utils/alert'
import {ConnectionService} from '../../core/services/connection.service'

@Injectable()
export class SysGradeListService {

  constructor(private connectionService: ConnectionService) {
  }

  /**获取课程列表：get**/
  reloadGradeListData(params) {
    const path = '/courseGrade'
    const configsObservable = Observable.fromPromise(this.connectionService.get(path, {params: params}))
    configsObservable.subscribe((page: any) => {
      if (page.data.result == '0') {
        //if (page.data.permission === 0) {/*请求数据"成功"*/
      /*    this.selectCourseData.length = 0
          this.selectCourseData.push(...page.data.list)*/
        //}
      } else {
          if(page.data.result == '10') {
              this.connectionService.isLoginByResult(page.data.result, page.data.msg)
          }
      }
    }, err => {
      appAlert.common.actionFailed('课程列表')
    })
    return configsObservable
  }
    /**删除成绩：delete**/
    deleteGrade(id) {
        const path = '/courseGrade/'+id
        const configsObservable = Observable.fromPromise(this.connectionService.delete(path))
        configsObservable.subscribe(res => {
            if (res.data.result === '0') {
                appAlert.common.actionSuccess('删除成功')
            } else {
                appAlert.common.actionFailed(res.data.msg)
            }
        }, err => {
            appAlert.common.actionFailed('删除失败')
        })
        return configsObservable
    }

    /**添加成绩：post**/
    addGrade(params, dialogRef, disabled?) {
        const path = '/studentGrade'
        console.log(params)
        const configsObservable = Observable.fromPromise(this.connectionService.post(path,params))
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

    /**修改成绩：post**/
    updateGrade(params, dialogRef, disabled?) {
        const path = '/studentGrade'
        console.log(params)
        const configsObservable = Observable.fromPromise(this.connectionService.put(path,params))
        configsObservable.subscribe(res => {
            if (res.data.result === '0') {
                dialogRef.close('success')
                appAlert.common.actionSuccess('修改成功')
            } else {
                if (disabled) {disabled.value = false}
                appAlert.common.actionFailed(res.data.msg)
            }
        }, err => {
            appAlert.common.actionFailed('修改失败')
        })
        return configsObservable
    }

    /**获取教师所有的课程：get**/
    reloadTeacherCourseListData() {
        const path = '/course/getAllTeacherCourseNoPage'
        const configsObservable = Observable.fromPromise(this.connectionService.get(path))
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
