import {Injectable} from '@angular/core'
import {observable} from 'mobx-angular'
import {Observable} from 'rxjs/Observable'
import appAlert from '../../utils/alert'
import {ConnectionService} from '../../core/services/connection.service'

@Injectable()
export class SysCourseListService {

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
                if(page.data.result == '10') {
                    this.connectionService.isLoginByResult(page.data.result, page.data.msg)
                }
            }
        }, err => {
            appAlert.common.actionFailed('课程列表')
        })
        return configsObservable
    }

    /**获取所有课程包含已经删除的：get**/
    reloadAllCourse() {
        const path = '/course/allCourseNoStatus'
        const configsObservable = Observable.fromPromise(this.connectionService.get(path))
        configsObservable.subscribe((page: any) => {
            if (page.data.result == '0') {
            } else {
                console.log(page.data)
                this.connectionService.isLoginByResult(page.data.result, page.data.msg)
            }
        }, err => {
            appAlert.common.actionFailed('课程列表')
        })
        return configsObservable
    }

    /**删除课程：post**/
    deleteCourse(id) {
        const path = '/course/deleteCourse/'+id
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

    /**添加课程：post**/
    addCourse(params, dialogRef, disabled?) {
        const path = '/course/addCourse'
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

    /**选课：get**/
    choseCourse(params) {
        const path = '/course/choseCourse'
        const configsObservable = Observable.fromPromise(this.connectionService.post(path,params))
        configsObservable.subscribe(res => {
            if (res.data.result === '0') {
                appAlert.common.actionSuccess('选课成功')
            } else {
                appAlert.common.actionFailed(res.data.msg)
            }
        }, err => {
            appAlert.common.actionFailed('选课失败')
        })
        return configsObservable
    }

    /**取消选课：get**/
    unchoseCourse(params) {
        const path = '/course/unchoseCourse'
        const configsObservable = Observable.fromPromise(this.connectionService.post(path,params))
        configsObservable.subscribe(res => {
            if (res.data.result === '0') {
                appAlert.common.actionSuccess('取消选课成功')
            } else {
                appAlert.common.actionFailed(res.data.msg)
            }
        }, err => {
            appAlert.common.actionFailed('取消选课失败')
        })
        return configsObservable
    }
}
